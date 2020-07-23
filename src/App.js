import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 0, name: "Wash dishes", order: 0 },
        { id: 1, name: "Do laundry", order: 0 },
        { id: 2, name: "Buy grocery", order: 0 }
      ],
      newItemInput: "",
      newItemPriority: "placeholder"
    };
  }

  handleAddItem = () => {
    if (this.state.newItemInput == "") return;
    this.setState({
      items: [
        ...this.state.items,
        {
          id: Math.round(Math.random() * 1000),
          name: this.state.newItemInput,
          order:
            this.state.newItemPriority == "placeholder"
              ? 0
              : this.state.newItemPriority
        }
      ],
      newItemInput: "",
      newItemPriority: "placeholder"
    });
  };

  handleChange = e => {
    this.setState({ newItemInput: e.target.value });
  };

  handleRemoveItem = id => {
    this.setState({ items: [...this.state.items.filter(i => i.id != id)] });
  };

  handleChangeItemPriority = e => {
    this.setState({ newItemPriority: e.target.value });
  };

  render() {
    return (
      <div id="main">
        <span className="header">Todo:</span>
        <ol>
          {this.state.items
            .sort((a, b) => b.order - a.order)
            .map(l => (
              <Item
                key={l.id}
                id={l.id}
                name={l.name}
                onClickDone={this.handleRemoveItem}
              />
            ))}
        </ol>
        <input value={this.state.newItemInput} onChange={this.handleChange} />
        <button onClick={this.handleAddItem}>Add</button>
        <select
          value={this.state.newItemPriority}
          onBlur={this.handleChangeItemPriority}
          onChange={this.handleChangeItemPriority}
        >
          <option value="placeholder" disabled>
            Priority
          </option>
          <option value="1">High</option>
          <option value="0">Normal</option>
          <option value="-1">Low</option>
        </select>
      </div>
    );
  }
}

const Item = props => {
  return (
    <li>
      {props.name}
      <button onClick={() => props.onClickDone(props.id)}>Done</button>
    </li>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
