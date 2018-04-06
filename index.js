const textNode = "TEXT_NODE";
//todo: need to setup babel
const render = (element, parent) => {

  const { type, props } = element;
  const isTextNode = type === textNode;
  //create DOM object
  //if it's a text node create a textNode dom element
  const domElement = isTextNode 
  ? document.createTextNode("")
  : document.createElement(type);
  
  const childElements = props.children || [];

  const isEventListener = propName => propName.startsWith("on");
  //add event listener to the dom element
  Object.keys(props)
    .filter(isEventListener)
    .forEach(propName => {
      const event = propName.toLowerCase().substring(2);
      domElement.addEventListener(event, props[propName]);
    });

  const isAttribute = propName =>
    !isEventListener(propName) && propName !== "children";
  //add attributes to the dom element
  Object.keys(props)
    .filter(isAttribute)
    .forEach(propName => {
      domElement[propName] = props[propName];
    });
  //render descendent objects
  childElements.forEach(child => {
    render(child, domElement);
  });
  //append child elements to the parent
  parent.appendChild(domElement);
};

elements = {
  type: "div",
  props: {
    class: 'test',
    children: [
      {
        type: 'span',
        props: {
          children: [
            { 
              type: textNode,
              props: { nodeValue: "text for the span"}
            }
          ]
        }
      },
      {
        type: 'br',
        props: {}
      },
      {
        type: 'button',
        props: {
          onClick: () => { alert('this is a test') },
          children: [
            { 
              type: textNode,
              props: { nodeValue: "button text"}
            }
          ]
        }
      }
    ]
  }
};

module.exports = {
render
}

//render(elements, document.getElementById("root"));
