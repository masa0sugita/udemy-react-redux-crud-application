import React from 'react';
import propTypes from 'prop-types'

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
// User.defaultProps = {
//   age: 100
// }
User.propTypes = {
  name: propTypes.string,
  age: propTypes.number.isRequired
}
export default App;
