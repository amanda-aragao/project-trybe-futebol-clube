import IMatchesModel from '../Interfaces/matches/IMatchesModel';
import TeamsModel from '../models/TeamsModel';
import ILeaderBoard from '../Interfaces/leaderBoard/ILeaderBoard';
import ITemsModel from '../Interfaces/teams/ITeamsModel';
import MatchesModel from '../models/MatchesModel';
import ITeams from '../Interfaces/teams/ITeams';
import IMatches from '../Interfaces/matches/IMatches';

export default class LeaderBoardService {
  constructor(
    private model: IMatchesModel = new MatchesModel(),
    private modelTeams: ITemsModel = new TeamsModel(),
  ) {}

  private static getVictories(matches: IMatches[]): number {
    let teamAway = 0;
    let teamHome = 0;

    matches.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        teamAway += 1;
      } else if (match.awayTeamGoals < match.homeTeamGoals) {
        teamHome += 1;
      }
    });
    const totalVictories = teamAway + teamHome;
    return totalVictories;
  }

  private static getDefeat(matches: IMatches[]): number {
    let defeatCountHome = 0;
    let defeatCountAway = 0;

    matches.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        defeatCountAway += 1;
      }
      if (match.awayTeamGoals < match.homeTeamGoals) {
        defeatCountHome += 1;
      }
    });
    const totalDefeat = defeatCountHome + defeatCountAway;
    return totalDefeat;
  }

  private static getHomeGoals(matches: IMatches[]): number {
    return matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  private static getAwayGoals(matches: IMatches[]): number {
    return matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  private static getDraws(matches: IMatches[], team: ITeams): number {
    let count = 0;

    matches.filter((m) => m.awayTeamId === team.id || m.homeTeamId === team.id).forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  }

  private static getCalc(finishedMatches: IMatches[], team: ITeams) {
    const { victories, draws, defeatTeams, homeTeamMatches,
      awayTeamMatches, homeGoals, awayGoals, homeOwnGoals,
      awayOwnGoals } = LeaderBoardService.populate(finishedMatches, team);
    return { victories,
      draws,
      defeatTeams,
      homeTeamMatches,
      awayTeamMatches,
      homeGoals,
      awayGoals,
      homeOwnGoals,
      awayOwnGoals,
    };
  }

  private static populate(finishedMatches: IMatches[], team: ITeams) {
    const homeTeamMatches = finishedMatches.filter((match) => match.homeTeamId === team.id);
    const awayTeamMatches = finishedMatches.filter((match) => match.awayTeamId === team.id);
    const victories = LeaderBoardService.getVictories(finishedMatches);
    const draws = LeaderBoardService.getDraws(finishedMatches, team);
    const homeGoals = LeaderBoardService.getHomeGoals(homeTeamMatches);
    const awayGoals = LeaderBoardService.getAwayGoals(awayTeamMatches);
    const homeOwnGoals = LeaderBoardService.getHomeGoals(awayTeamMatches);
    const awayOwnGoals = LeaderBoardService.getAwayGoals(homeTeamMatches);
    const defeatTeams = LeaderBoardService.getDefeat(finishedMatches);
    return { victories,
      draws,
      defeatTeams,
      homeTeamMatches,
      awayTeamMatches,
      homeGoals,
      awayGoals,
      homeOwnGoals,
      awayOwnGoals };
  }

  private static mapLeaderBoard(allTeams: ITeams[], finishedMatches: IMatches[]): object {
    return allTeams.map((team) => {
      const { victories, draws,
        defeatTeams, homeTeamMatches,
        awayTeamMatches, homeGoals, awayGoals,
        homeOwnGoals, awayOwnGoals } = LeaderBoardService.getCalc(finishedMatches, team);
      const goalsFavor = homeGoals + awayGoals;
      const goalsOwn = homeOwnGoals + awayOwnGoals;
      return {
        name: team.teamName,
        totalPoints: (victories * 3) + (draws),
        totalGames: homeTeamMatches.length + awayTeamMatches.length,
        totalVictories: victories,
        totalDraws: draws,
        totalLosses: defeatTeams,
        goalsFavor,
        goalsOwn,
        // goalsBalance: goalsFavor - goalsOwn,
      };
    });
  }

  public async findAllLeaderBoard(): Promise<ILeaderBoard[] | object> {
    const finishedMatches = await this.model.finishedMatches();
    const allTeams = await this.modelTeams.findAllTeams();
    const leaderBoard = LeaderBoardService.mapLeaderBoard(allTeams, finishedMatches);
    return leaderBoard;
  }
}
