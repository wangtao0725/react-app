import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import './myStyles.scss';

const ThemeContext = React.createContext();
const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

const RenderAll = (props) => {
  const username = getUserName();
  if (username) {
    const newProps = {username, ...props};
    console.log('props render all ', newProps);
    return (
      <Fragment>
        {props.login(newProps)}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {props.unlogin(props)}
      </Fragment>
    )
  }
}

function getUserName() {
  return 'TJ';
}

class App extends React.Component {
  state = {
    CaptainKirkBio: {},
    Foo: null,
  }
  componentDidMount() {
    this.onGetKirkBio();
    import(/* webpackChunkName: 'Foo' */ './Foo').then(Foo => {
      this.setState({ Foo: Foo.default });
    });
  }
  onGetKirkBio = async () => {
    try {
      const result = await fetch('http://stapi.co/api/v1/rest/character/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          title: 'James T. Kirk',
          name: 'James T. Kirk',
        },
      });
      const resultJSON = await result.json();
      const character = resultJSON.characters[0];
      this.setState({ CaptainKirkBio: character });
    } catch (error) {
      console.log('error', error);
    }
  };
  render() {
    const { CaptainKirkBio, Foo } = this.state;
    return (
      <div className='app'>
        <RenderAll
          login={({username}) => <h1>Hello {username}</h1>}
          unlogin={() => <h1>please go login</h1>}
        />
      </div>
    );
  }
}

ReactDOM.render( <App /> , document.getElementById('app'));