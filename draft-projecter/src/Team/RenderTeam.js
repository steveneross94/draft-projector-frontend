import React from 'react';

class RenderTeam extends React.Component {

render(){
    const { myPlayers, budget, num_qb, num_rb, num_wr, num_te, num_flex, num_superflex, num_k, num_def, num_bench } = this.props
    let sumRoster = num_qb+num_rb+num_wr+num_te+num_flex+num_superflex+num_k+num_def+num_bench 
    let playersDrafted = myPlayers ? myPlayers.length : 0
    let budgetPerPlayer = (budget / parseInt(sumRoster) - parseInt(playersDrafted)).toFixed(2)
    return (
        <div>
        <table>
            {num_qb > 0 &&
                <tr>
                <th>QB:</th>
                <td>{num_qb}</td>
            </tr> 
            }
            {num_rb > 0 &&
            <tr>
                <th>RB:</th>
                <td>{num_rb}</td>
            </tr> 
            }
            {num_wr > 0 && 
            <tr>
                <th>WR:</th>
                <td>{num_wr}</td>
            </tr> 
            }
            {num_te > 0 &&
            <tr>
                <th>TE:</th>
                <td>{num_te}</td>
            </tr> 
            }
            {num_flex > 0 &&
                <tr>
                    <th>Flex:</th>
                    <td>{num_flex}</td>
                </tr>
            }
            {num_k > 0 && 
            <tr>
                <th>K:</th>
                <td>{num_k}</td>
            </tr> 
            }
            {num_def > 0 &&
            <tr>
                <th>DST:</th>
                <td>{num_def}</td>
            </tr> 
            }
            {num_superflex > 0 &&
            <tr>
                <th>Superflex:</th>
                <td>{num_superflex}</td>
            </tr> 
            }
            {num_bench > 0 &&
            <tr>
                <th>Bench:</th>
                <td>{num_bench}</td>
            </tr> 
            }   
            <tr>
                <th>Total Roster Spots:</th>
                <td>{sumRoster}</td>
            </tr> 
            <tr>
                <th>Players Drafted:</th>
                <td>{myPlayers ? myPlayers.length : 0}</td>
            </tr> 
            <tr>
                <th>Remaining Auction $:</th>
                <td>${budget}</td>
            </tr> 
            <tr>
                <th>Remaining $ Per Player:</th>
                <td>${budgetPerPlayer}</td>
            </tr> 
        </table>
        </div>
    )
    }
}
 
export default RenderTeam;