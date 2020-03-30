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

// ! 非受控组件
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

/**
 * 状态提升：在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。
 *
 * 创建一个用于计算水在给定温度下是否会沸腾的温度计算器
 * 提供摄氏/华氏度的输入框，并保持两个输入框的数据同步
 */
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: '', scale: 'c' };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

/**
 * Fragment：组件返回一个子元素列表 : key 是唯一可以传递给 Fragment 的属性。未来可能会添加对其他属性的支持，例如事件。
 * 短语法： <> : 不支持 key 或属性
 */
function ListItem({ item }) {
  return (
    <React.Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  );
}

function Columns2({ item }) {
  const style = {
    textAlign: 'center',
    border: '1px solid red',
  };

  return (
    <>
      <td style={style}>{item.term}</td>
      <td style={style}>{item.description}</td>
    </>
  );
}
class Columns extends React.Component {
  render() {
    const item = this.props.item;

    return (
      <>
        <td>{item.term}</td>
        <td>{item.description}</td>
      </>
    );
  }
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}

class Table extends React.Component {
  render() {
    const items = this.props.items;
    const style = {
      textAlign: 'center',
      border: '1px solid #ddd',
    };

    return (
      <div>
        <table style={style}>
          <thead>
            <tr>
              <th>品牌</th>
              <th>简介</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <Columns item={item} />
              </tr>
            ))}
          </tbody>
        </table>

        <table style={style}>
          <thead>
            <tr>
              <th>品牌</th>
              <th>简介</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <Columns2 item={item} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const items = [
  {
    id: 'a12df',
    term: 'HuaWei Mate X',
    description: 'HUAWEI Mate X, 5G折叠人工智能手机',
  },
  {
    id: 'b2c3c',
    term: 'MI 10',
    description: ' 骁龙865 1亿像素8K电影相机 50倍变焦 平衡立体声',
  },
];

/**
 * 无障碍
 */
// 使用程序管理焦点
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创造一个 textInput DOM 元素的 ref
    this.textInput = React.createRef();

    this.focus = this.focus.bind(this);
  }

  focus() {
    // 使用原始的 DOM API 显式地聚焦在 text input 上
    // 注意：我们通过访问 “current” 来获得 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 使用 `ref` 回调函数以在实例的一个变量中存储文本输入 DOM 元素
    //（比如，this.textInput）。
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <button onClick={this.focus}>获取焦点</button>
      </div>
    );
  }
}

// 无障碍 ：外部点击模式，用户可以通过点击元素以外的地方来关闭已打开的弹出框。
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen,
    }));
  }

  // 我们在下一个时间点使用 setTimeout 关闭弹窗。
  // 这是必要的，因为失去焦点事件会在新的焦点事件前被触发，
  // 我们需要通过这个步骤确认这个元素的一个子节点
  // 是否得到了焦点。
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false,
      });
    });
  }

  // 如果一个子节点获得了焦点，不要关闭弹窗。
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React 通过把失去焦点和获得焦点事件传输给父节点
    // 来帮助我们。
    return (
      <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler} aria-haspopup="true" aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}

/**
 * Context
 */
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class ThemeApp extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

class Button extends React.Component {
  render() {
    console.log('this.props.theme :', this.props.theme);
    return <button className={this.props.theme}>按钮</button>;
  }
}

/**
 * 错误边界
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

/**
 * Ref 转发: https://zh-hans.reactjs.org/docs/forwarding-refs.html
 */
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));
// 这样，使用 FancyButton 的组件可以获取底层 DOM 节点 button 的 ref ，并在必要时访问，就像其直接使用 DOM button 一样。
const refButton = React.createRef();

/**
 * 高阶组件
 */
const CommentList = [];
const BlogPost = {};
const DataSource = {
  getComments() {},
  getBlogPost(id) {},
  addChangeListener(callback) {
    callback();
  },
  removeChangeListener(callback) {
    callback();
  },
};
const CommentListWithSubscription = withSubscription(CommentList, (DataSource) => DataSource.getComments());

const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id));

// 高阶组件（HOC）：是参数为组件，返回值为新组件的函数
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props),
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props),
      });
    }

    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

/**
 * 高阶组件示例
 * 假设我们有A B两个组件,他们的大部分实现都是相同的
 */
class A extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: 'data',
    };
  }
  componentDidMount() {
    let data = '初始化数据';
    this.setState({ data });
  }
  handleChange() {
    this.setState({ data: '改变数据' });
  }
  render() {
    return (
      <div>
        <span>这是组件A自己的内容</span>
        <h2 onClick={this.handleChange.bind(this)}>{this.props.data}</h2>
      </div>
    );
  }
}

class B extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 'data' };
  }
  componentDidMount() {
    let data = '初始化数据';
    this.setState({ data });
  }
  handleChange() {
    this.setState({ data: '改变数据' });
  }
  render() {
    return (
      <div>
        这是组件B自己的内容
        <h2 onClick={this.handleChange.bind(this)}>{this.props.data}</h2>
      </div>
    );
  }
}

// 根据两个组件的特性封装高阶组件（将两个组件共通点抽取出来）
function hocBox(WrappedComponent) {
  // ...并返回另一个组件...
  return class extends React.Component {
    componentWillMount() {
      let data = '这是hoc的data';
      this.setState({ data });
    }
    handleChange = () => {
      this.setState({ data: '改变数据' });
    };
    render() {
      return <WrappedComponent update={this._alert} {...this.props} />;
    }
  };
}

// 使用
function WrapperComp(Comp) {
  class WrapComp extends React.Component {
    render() {
      return (
        <div>
          <p>属性代理高阶组件</p>
          <Comp {...this.props}></Comp>
        </div>
      );
    }
  }
  return WrapComp;
}

@WrapperComp
class A2 extends React.Component {
  render() {
    return <h4>hello Jason</h4>;
  }
}

// 反向继承的高阶组件中的state和props会覆盖调原组件中的state和props
function WrapperComp3(Comp) {
  class WrapComp extends Comp {
      componentDidMount() {
          console.log('反向代理高阶组件')
      }
      render() {
          return <Comp {...this.props}></Comp>
      }
  }
  return WrapComp;
}
@WrapperComp3
class A3 extends React.Component {
  componentDidMount() {
      console.log('加载完成')
  }
  render() {
      return <h4>反向继承父组件</h4>
  }
}


/**
 * =============================================================================
 * App
 * =============================================================================
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
        <h1 className="step-title">函数组件：</h1>
        <Welcome name="world" />
        <Welcome name="Sara" />
        <Welcome2 name="Duyb" />
        <h1 className="step-title">组合组件 ：</h1>
        <Comment date={comment.date} text={comment.text} author={comment.author} />
        <h1 className="step-title">State & 生命周期 ：</h1>
        <Clock />
        <Clock />
        <Clock />
        <Toggle />
        <h1 className="step-title">事件处理 ：</h1>
        <LoggingButton />
        <h1 className="step-title">条件渲染 ：</h1>
        <LoginControl />
        <h2>与运算符 && ：</h2>
        <Mailbox unreadMessages={messages} />
        <h2>阻止组件渲染</h2>
        <Page />
        <h1 className="step-title">列表 & Key：</h1>
        <NumberList numbers={numbers} />
        <h1 className="step-title">表单：</h1>
        <NameForm />
        <FlavorForm />
        <h1 className="step-title">非受控组件：</h1>
        <FileInput />
        <h1 className="step-title">状态提升：</h1>
        <Calculator />
        <h1 className="step-title">Fragment ：</h1>
        <Glossary items={items} />
        <Table items={items} />
        <h1 className="step-title">无障碍 ：使用程序管理焦点</h1>
        <CustomTextInput />
        <h1 className="step-title">无障碍 ：外部点击模式，用户可以通过点击元素以外的地方来关闭已打开的弹出框。</h1>
        <BlurExample />
        <h1 className="step-title">Context：</h1>
        <ThemeApp />
        <h1 className="step-title">错误边界：</h1>
        <ErrorBoundary>
          <ThemeApp />
        </ErrorBoundary>
        <h1 className="step-title">Ref 转发：</h1>
        <FancyButton ref={refButton}>Click me!</FancyButton>;<h1 className="step-title">高阶组件：</h1>

        <h1 className="step-title">高阶组件：</h1>
        <A />
        <B />
        <A2 />
        <A3 />
      </section>
    </div>
  );
}

export default App;
