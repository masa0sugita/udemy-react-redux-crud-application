import React, { Component } from 'react';

class App extends Component {
  render() {
    const text = 'これはてすとです';
    const dom = <h1 className="foo">{text}</h1>;
    return (
      <React.Fragment>
        {dom}
        <input
          type="text"
          onClick={() => {
            console.log('Click!!');
          }}
        />
      </React.Fragment>
    );
  }
}

export default App;
