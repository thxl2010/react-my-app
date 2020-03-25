import React from 'react';
import './App.css';
import logo from './logo.svg';

/**
 * 函数组件
 */
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class Welcome2 extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

/**
 * 组合组件
 */
function Avatar(props) {
  return <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />;
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{props.date}</div>
    </div>
  );
}

const comment = {
  text: '哈哈哈哈哈哈哈',
  date: new Date().toLocaleDateString(),
  author: {
    name: 'du',
    avatarUrl: 'https://github.githubassets.com/images/icons/emoji/tada.png',
  },
};

/**
 * State & 生命周期
 */
class Clock extends React.Component {
  // 构造函数是唯一可以给 this.state 赋值的地方
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  // 挂载: 会在组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // 卸载
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // WARNING: 不要直接修改 State , 而是应该使用 setState()
    //! WARNING: State 的更新可能是异步的
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world! Time: </h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

/**
 * 事件处理
 */
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>;
  }
}

// 实验性的 public class fields 语法, Create React App 默认启用此语法
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}

/**
 * 条件渲染
 */
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        <div>
          The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
        </div>
        {button}
      </div>
    );
  }
}

// 与运算符 &&
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && <h2>You have {unreadMessages.length} unread messages.</h2>}
    </div>
  );
}
const messages = ['React', 'Re: React', 'Re:Re: React'];

// 阻止组件渲染
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState((state) => ({
      showWarning: !state.showWarning,
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>{this.state.showWarning ? 'Hide' : 'Show'}</button>
      </div>
    );
  }
}

/**
 * 列表 & Key
 * key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此应当给数组中的每一个元素赋予一个确定的标识。
 * 通常，我们使用数据中的 id 来作为元素的 key
 * 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key
 * 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。
 */
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>);
  return <ul>{listItems}</ul>;
}
const numbers = [1, 2, 3, 4, 5];

/**
 * 表单
 * <input type="text">, <textarea> 和 <select> 之类的标签都非常相似—它们都接受一个 value 属性，你可以使用它来实现受控组件
 */
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <p>{this.state.value}</p>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

/**
 * React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。
 * 这在受控组件中更便捷，因为只需要在根标签中更新它
 * 你可以将数组传递到 value 属性中，以支持在 select 标签中选择多个选项。
 */
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'coconut' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('你喜欢的风味是: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          {/* WARNING */}
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

/**
 * App
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>

      <section>
        {/* 函数组件 */}
        <Welcome name="world" />
        <Welcome name="Sara" />
        <Welcome2 name="Duyb" />

        {/* 组合组件 */}
        <Comment date={comment.date} text={comment.text} author={comment.author} />

        {/* State & 生命周期 */}
        <Clock />
        <Clock />
        <Clock />

        <Toggle />

        {/* 事件处理 */}
        <LoggingButton />

        {/* 条件渲染 */}
        <LoginControl />
        {/* 与运算符 && */}
        <Mailbox unreadMessages={messages} />
        {/* 阻止组件渲染 */}
        <Page />

        {/* 列表 & Key */}
        <NumberList numbers={numbers} />

        {/* 表单 */}
        <NameForm />
        <FlavorForm />
      </section>
    </div>
  );
}

export default App;
