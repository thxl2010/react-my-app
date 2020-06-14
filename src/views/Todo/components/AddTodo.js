import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '@/redux/actions';

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  componentDidMount() {
    console.log(
      'mapDispatchToProps is null , this.props.dispatch :',
      this.props.dispatch
    );
    console.log('this.props.addTodo :', this.props.addTodo);
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    // https://react-redux.js.org/using-react-redux/connect-mapdispatch#default-dispatch-as-a-prop
    this.props.addTodo(this.state.input);

    // connect(null, null)
    // 第二个参数 mapDispatchToProps 为 null 时，props 会接收到 dispatch 方法
    // this.props.dispatch({
    //   type: 'ADD_TODO',
    //   payload: {
    //     id: 9999,
    //     content: this.state.input,
    //   },
    // });

    this.setState({ input: '' });
  };

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-todo" onClick={this.handleAddTodo}>
          Add Todo
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  // null // ! WARNING: mapDispatchToProps is null => this.props.dispatch({ type, payload });
  { addTodo } // ! WARNING: mapDispatchToProps => this.props.addTodo(this.state.input);
)(AddTodo);
// export default AddTodo;
