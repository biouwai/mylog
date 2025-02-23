// 1. createElement,转换出的便于处理的对象，对象有type、props两个属性
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

// 2.render,将对象挂载
function render(element, container) {
  // 创建真实dom
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  // 添加属性
  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((key) => {
      dom[key] = element.props[key];
    });

  // 递归遍历children
  element.props.children.forEach((child) => render(child, dom));

  // 挂载
  container.appendChild(dom);
}

const MiniR = {
  createElement,
  render,
};

/** @jsx MiniR.createElement */
const container = document.getElementById("root");

// eslint-disable-next-line react/no-deprecated
MiniR.render(
  <div>
    div
    <h1 style="background: red">
      h1
      <p style="background: blue">p</p>
      <a style="background: yellow">a</a>
    </h1>
    <h2 />
  </div>,
  container
);
