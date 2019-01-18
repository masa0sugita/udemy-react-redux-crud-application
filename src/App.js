import React from 'react';

const App = () => {
  const text = 'これはてすとです';
  const dom = <h1 className="foo">{text}</h1>;
  const profiles = [
    {
      name: "masao",
      age: 45
    },
    {
      name: "taro",
    }
  ]
  return (
    <React.Fragment>
      {dom}
    
    {
      profiles.map((profile, index) => {
        return <User name={profile.name} age={profile.age} key={index} />
      })
    }
    </React.Fragment>
  );
};

const User = (props) => {
  return <div>I am {props.name}. age {props.age} yo.</div>
}
User.defaultProps = {
  age: 100
}

export default App;
