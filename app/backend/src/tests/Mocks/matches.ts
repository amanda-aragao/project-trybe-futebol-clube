const matches = 
  [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 3,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Internacional"
      },
      "awayTeam": {
        "teamName": "Santos"
      },
    },
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]

  const matchesInProgress= [
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]

const matchesFinished = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 3,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    },
  }
  ]

  const newMatchData ={
    "homeTeamId": 6,
    "awayTeamId": 8, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  

  const returnNewMatchData = 
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 2,
    }
  
  const updateMatchId = {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }

  const editInProgressId = { "message": "Finished" }

    export default { matches, matchesInProgress, newMatchData,updateMatchId, matchesFinished, returnNewMatchData, editInProgressId  };

    