import React, { Component } from 'react';
import { TEAMS } from './constants';
import { SEED_BRACKET } from './seed';

const dateStyle = {
  margin: 0,
};
const roundGroupStyle = {
  padding: 10,
  paddingTop: 5,
  margin: 0,
  borderBottom: '1px solid lightgrey',
  boxSizing: 'border-box',
  position: 'relative',
};
const matchStyle = {
  margin: 0,
  listStyle: 'none',
  lineHeight: '1.4em',
  fontSize: '0.9em',
};
const pointMatchStyle = {
  ...matchStyle,
  backgroundColor: '#daf1ff',
};
const winnerStyle = {
  color: '#139458',
  fontWeight: 'bold',
};
const loserStyle = {
  color: '#8e8e8e',
  fontWeight: 'normal',
};

const getTeamId = (team, currentGame = null) => {
  if (typeof team === 'number') {
    return team;
  }
  const teamInfo = team.split('|');
  const prevDate = teamInfo[0];
  const prevTime = teamInfo[1];
  if (currentGame && currentGame.round > 1) {
    let prevGame = null;
    SEED_BRACKET.forEach((round) => {
      Object.keys(round).forEach((date) => {
        if (date === prevDate) {
          round[date].forEach((game) => {
            if (game.time === prevTime && game.winner !== null) {
              prevGame = game;
            }
          })
        }
      })
    });
    if (prevGame !== null) {
      return getTeamId(prevGame.winner, prevGame);
    }
  }
  return team;
};

const getGameTeam = (teamId, currentGame = null) => {
  if (typeof teamId === 'number') {
    return TEAMS[teamId];
  }
  const teamInfo = teamId.split('|');
  const prevDate = teamInfo[0];
  const prevTime = teamInfo[1];
  if (currentGame && currentGame.round > 1) {
    let prevGame = null;
    SEED_BRACKET.forEach((round) => {
      Object.keys(round).forEach((date) => {
        if (date === prevDate) {
          round[date].forEach((game) => {
            if (game.time === prevTime && game.winner !== null) {
              prevGame = game;
            }
          })
        }
      })
    });
    if (prevGame !== null) {
      return getGameTeam(prevGame.winner);
    }
  }
  return `Winner of ${prevDate} ${prevTime}`;
};

const getGameTeamStyle = (teamId, currentGame = null) => {
  let style = {};
  if (currentGame.winner !== null) {
    if (teamId === currentGame.winner) {
      style = winnerStyle;
    } else {
      style = loserStyle;
    }
  }
  return style;
};

class Bracket extends Component {
  render() {
    const today = new Date();
    const todayDate = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
    return (
      <div>
        {
          SEED_BRACKET.map((round, roundIndex) => {
            return (
              <div key={roundIndex}>
                {
                  Object.keys(round).map((date, dailyIndex) => {
                    const isToday = date === todayDate;
                    return (
                      <div key={`${date}-${dailyIndex}`} style={isToday ? pointMatchStyle : matchStyle}>
                        <h4 style={dateStyle}>
                          {date}&nbsp;&nbsp;
                          {
                            isToday ?
                              <strong style={{ color: '#1ed0ca' }}>
                                <span role="img" aria-label="arrow">👈</span>
                                <span role="img" aria-label="arrow">👈</span>
                                &nbsp;TODAY
                              </strong>
                              : null
                          }
                        </h4>
                        <ul style={roundGroupStyle}>
                          {
                            round[date].map((game, gameIndex) => {
                              const team1Id = getTeamId(game.team1, game);
                              const team2Id = getTeamId(game.team2, game);
                              const team1 = getGameTeam(team1Id);
                              const team2 = getGameTeam(team2Id);
                              const team1Style = getGameTeamStyle(game.team1, game);
                              const team2Style = getGameTeamStyle(game.team2, game);
                              const winner = game.winner;
                              const isTeam1Win = (winner !== null && winner === team1Id);
                              const isTeam2Win = (winner !== null && winner === team2Id);
                              const score1 = game.score1;
                              const score2 = game.score2;
                              const scoreMessage1 = isTeam1Win && score1 === 0 ? '(부전승)' : `${score1 !==0 ? `Score: ${score1}` : ''}`;
                              const scoreMessage2 = isTeam2Win && score2 === 0 ? '(부전승)' : `${score2 !==0 ? `Score: ${score2}` : ''}`;
                              return (
                                <li key={`${game.time}-${gameIndex}`} style={matchStyle}>
                                  {game.time}&nbsp;/&nbsp;
                                  <strong style={team1Style}>
                                    {team1} {isTeam1Win ? 'WIN' : ''} {winner !== null? scoreMessage1 : ''}
                                  </strong>
                                  &nbsp;vs&nbsp;
                                  <strong style={team2Style}>
                                    {team2} {isTeam2Win ? 'WIN' : ''} {winner !== null ? scoreMessage2 : ''}
                                  </strong>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    )
                    return 
                  })
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Bracket;
