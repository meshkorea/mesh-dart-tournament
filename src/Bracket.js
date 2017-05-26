import React, { Component } from 'react';
import { TEAMS } from './constants';
import { SEED_BRACKET } from './seed';

const dateStyle = {
  margin: '5px 0',
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
  paddingBottom: 5,
};
const pointMatchStyle = {
  ...matchStyle,
  backgroundColor: '#daf1ff',
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
            if (currentGame.time === prevTime && game.winner !== null) {
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
  return `Winner of ${prevDate} ${prevTime} game`;
};

class Bracket extends Component {
  render() {
    const today = new Date('2017-6-7');
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
                              const team1 = getGameTeam(game.team1, game);
                              const team2 = getGameTeam(game.team2, game);
                              const team1Style = {}
                              const team2Style = {};
                              return (
                                <li key={`${game.time}-${gameIndex}`} style={matchStyle}>
                                  {game.time}&nbsp;/&nbsp;
                                  <strong style={team1Style}>{team1}</strong> vs <strong style={team2Style}>{team2}</strong>
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
