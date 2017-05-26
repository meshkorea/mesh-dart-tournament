import React, { Component } from 'react';
import { TEAMS } from './constants';

const seed = [
  {
    date: "2017-5-29",
    games: [
      {
        time: "15:00",
        team1: 1,
        team2: 2,
      },
      {
        time: "15:30",
        team1: 3,
        team2: 4,
      },
    ],
  },
  {
    date: "2017-5-30",
    games: [
      {
        time: "15:00",
        team1: 5,
        team2: 6,
      },
      {
        time: "15:30",
        team1: 7,
        team2: 8,
      },
    ],
  },
  {
    date: "2017-5-31",
    games: [
      {
        time: "15:00",
        team1: 11,
        team2: 12,
      },
      {
        time: "15:30",
        team1: 13,
        team2: 14,
      },
    ],
  },
  {
    date: "2017-6-1",
    games: [
      {
        time: "15:00",
        team1: 15,
        team2: 16,
      },
      {
        time: "15:30",
        team1: 17,
        team2: 18,
      },
    ],
  },



];

class Bracket extends Component {
  render() {
    const today = new Date('2017-5-29');
    const todayDate = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
    console.log(todayDate);
    return (
      <div>
        {
          seed.map((data, index) => (
            <div key={`${data.date}-${index}`}>
              <h4>{data.date} <strong style={{ color: 'red' }}>{data.date === todayDate ? '<TODAY>' : null}</strong></h4>
              <ul>
              {
                data.games.map((game, gameIndex) => (
                  <li key={`${game.time}-${gameIndex}`}>
                    {game.time} / {TEAMS[game.team1]} vs {TEAMS[game.team2]}
                  </li>
                ))
              }
              </ul>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Bracket;
