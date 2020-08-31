import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      proverb: "",
      region: ""
    }


  }
  componentDidMount() {
    this.getProverb()
  }


  getNewProverb = () => {
    this.getProverb()
  }

  async getProverb() {
    const url = 'http://localhost:5000/api/v1/proverbs';

    const response = await (await fetch(url)).json()
    // console.log(response);

    this.setState({
      proverb: response.proverb,
      region: response.region
    })

  }

  render() {
    const { proverb, region } = this.state
    return (

      <div className="wrapper">
        <h1 className='title'>African Proverbs App</h1>
        <div id='quote-box'>
          <div id='text'><p>{proverb}</p></div>
          <div id='author'><h5>{region}</h5></div>

          <div id='buttons'>
            <button id='new-quote' className='button' onClick={this.getNewProverb}>New Proverb</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
