import React from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = React.useState([])
  const [values, setValues] = React.useState({})
  const [index, setIndex] = React.useState('')
  // get calculated results
  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    setValues(values.data);
  }
  // get seen indexes
  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(seenIndexes.data);
  }
  // get init data on component mount
  React.useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // make req
    await axios.post('/api/values', {
      index,
    });
    // reset input
    setIndex('');
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
}

export default Fib;
