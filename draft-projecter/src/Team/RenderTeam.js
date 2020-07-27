import React from 'react';

class RenderTeam extends React.Component {
    state = {
        qbArray: [],
        rbArray: [], 
        wrArray: [], 
        teArray: [],
        flexArray: [],
        kArray: [], 
        defArray: [], 
        superflexArray: [], 
        benchArray: []
      }

      componentDidMount(){
          this.doQbNumTimes()
          this.doRbNumTimes()
          this.doWrNumTimes()
          this.doTeNumTimes() 
          this.doFlexNumTimes()
          this.doKNumTimes()
          this.doDefNumTimes()
          this.doSuperflexNumTimes() 
          this.doBenchNumTimes()
      }


    doQbNumTimes = () => {
        let newArray = []
        for (let i = 0; i < this.props.num_qb; i++){
           newArray.push('')
        }
        this.setState({qbArray: newArray})
    }

    doRbNumTimes = () => {
        let newArray = []
        for (let i = 0; i < this.props.num_rb; i++){
           newArray.push('')
        }
        this.setState({rbArray: newArray})
        }
    

    doWrNumTimes = () => {
        let newArray = []
        for (let i = 0; i < this.props.num_wr; i++){
           newArray.push('')
        }
        this.setState({wrArray: newArray})
    }

    doTeNumTimes = () => {
        let newArray = []
        for (let i = 0; i < this.props.num_te; i++){
           newArray.push('')
        }
        this.setState({teArray: newArray})
    }

    doFlexNumTimes = () => {
        let newArray = []
        for (let i = 0; i < this.props.num_flex; i++){
           newArray.push('')
        }
        this.setState({flexArray: newArray})
    }

    doKNumTimes = () => {
        let newArray = []
        for (let i = 0; i < this.props.num_k; i++){
           newArray.push('')
        }
        this.setState({kArray: newArray})
    }

    doDefNumTimes = () => {
        let newArray = []
        for (let i = 0; i < this.props.num_def; i++){
           newArray.push('')
        }
        this.setState({defArray: newArray})
    }

    doSuperflexNumTimes = () => {
        let newArray = []
        for (let i = 0; i < this.props.num_superflex; i++){
           newArray.push('')
        }
        this.setState({superflexArray: newArray})
    }

    doBenchNumTimes = () => {
        let newArray = []
        for (let i = 0; i < this.props.num_bench; i++){
           newArray.push('')
        }
        this.setState({benchArray: newArray})
    }



    render(){
        return (
            <div>
            <table>
                {this.state.qbArray.map(player => 
                    <tr>
                    <th>QB:</th>
                    <td>{player.name && player.name}</td>
                    </tr> 
                )}
                  {this.state.rbArray.map(player => 
                    <tr>
                    <th>RB:</th>
                    <td>{player.name && player.name}</td>
                    </tr> 
                )}
                      {this.state.wrArray.map(player => 
                    <tr>
                    <th>WR:</th>
                    <td>{player.name && player.name}</td>
                    </tr> 
                )}
                {this.state.teArray.map(player => 
                    <tr>
                    <th>TE:</th>
                    <td>{player.name && player.name}</td>
                    </tr> 
                )}
                 {this.state.flexArray.map(player => 
                    <tr>
                    <th>Flex:</th>
                    <td>{player.name && player.name}</td>
                    </tr> 
                )}
                 {this.state.kArray.map(player => 
                    <tr>
                    <th>K:</th>
                    <td>{player.name && player.name}</td>
                    </tr> 
                )}
                 {this.state.defArray.map(player => 
                    <tr>
                    <th>DST:</th>
                    <td>{player.name && player.name}</td>
                    </tr> 
                )}
                 {this.state.superflexArray.map(player => 
                    <tr>
                    <th>Superflex:</th>
                    <td>{player.name && player.name}</td>
                    </tr> 
                )}
                 {this.state.benchArray.map(player => 
                    <tr>
                    <th>Bench:</th>
                    <td>{player.name && player.name}</td>
                    </tr> 
                )}
            </table>
            </div>
        )
    }
}
 
export default RenderTeam;