import React from 'react'

function MyTeam({ myTeam, removeFromMyTeam }) {

    const playersHash = {'QB': 7, 'RB': 6, 'WR': 5, 'TE': 4, 'K': 3, 'DST': 2}
    let sortedPlayers = myTeam.sort((p1,p2) => playersHash[p1.player_position] > playersHash[p2.player_position] ? -1 : 1)

    return (
        <div className='myteam'>
            <ul>
                {sortedPlayers.map(player => 
                    <li>{player.player_position} {player.player_name} {player.team} {player.user_price}
                    <button onClick={() => removeFromMyTeam(player)}>Remove</button>
                    </li>
                    )}
            </ul>
        </div>
    )
}

export default MyTeam

