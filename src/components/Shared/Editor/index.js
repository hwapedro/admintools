import * as React from "react";

import { i18n } from "../../../store/utils";

let _id = 0;
const toolbar = [
  "bold",
  "italic",
  "heading",
  "heading-smaller",
  "heading-bigger",
  "heading-1",
  "heading-2",
  "heading-3",
  "code",
  "unordered-list",
  "ordered-list",
  "|",
  "strikethrough",
  "link",
  "image",
  "table",
  "horizontal-rule",
  "preview",
  "side-by-side",
  "fullscreen",
  "|",
  "quote"
];
const generateId = () => `simplemde-editor-${++_id}`;
export default class Editor extends React.PureComponent {
  keyChange = false;

  static defaultProps = {
    events: {},
    onChange: () => {},
    options: {}
  };

  state = {
    value: this.props.value === "" ? i18n : this.props.value
  };

  id = this.props.id ? this.props.id : generateId();
  simpleMde = null;
  editorEl = null;
  editorToolbarEl = null;

  constructor(props) {
    super(props);
    this.elementWrapperRef = null;
    this.setElementWrapperRef = element => {
      this.elementWrapperRef = element;
    };
  }

  componentDidMount() {
    console.log(this.state.value)
    if (typeof window !== undefined) {
      this.createEditor();
      this.addEvents();
      this.addExtraKeys();
      this.getCursor();
      this.getMdeInstance();
    }
  }

  componentDidUpdate(prevProps) {
    const { value, language } = this.props;
    if (
      language !== prevProps.language && // This is somehow fixes moving cursor for controlled case
      value !== prevProps.value // This one fixes no value change for uncontrolled input. If it's uncontrolled prevProps will be the same
    ) {
      this.simpleMde.value(value || i18n[language]);
    }
    this.keyChange = false;
  }

  componentWillUnmount() {
    if (this.editorEl !== null && this.editorEl !== undefined) {
      this.removeEvents();
    }
  }

  createEditor = () => {
    const SimpleMDE = require("simplemde");
    const initialOptions = {
      element: document.getElementById(this.id),
      initialValue: this.props.value
    };

    const allOptions = Object.assign({}, initialOptions, this.props.options);
    this.simpleMde = new SimpleMDE({ ...allOptions, toolbar });
  };

  eventWrapper = () => {
    const {language} = this.props
    if (!this.props.value) {
      this.setState({
        value: {...this.state.value, [language]: this.simpleMde.value()}
      });
    }
    this.props.onChange({
      target: { name: this.props.name, value: this.simpleMde.value() }
    });
  };

  removeEvents = () => {
    if (this.editorEl && this.editorToolbarEl) {
      this.editorEl.removeEventListener("keyup", this.eventWrapper);
      this.editorEl.removeEventListener("paste", this.eventWrapper);
      this.editorToolbarEl.removeEventListener("click", this.eventWrapper);
    }
  };

  addEvents = () => {
    if (this.elementWrapperRef && this.simpleMde) {
      this.editorEl = this.elementWrapperRef;
      this.editorToolbarEl = this.elementWrapperRef.getElementsByClassName(
        "editor-toolbar"
      )[0];

      this.editorEl.addEventListener("keyup", this.eventWrapper);
      this.editorEl.addEventListener("paste", this.eventWrapper);
      this.editorToolbarEl &&
        this.editorToolbarEl.addEventListener("click", this.eventWrapper);

      this.simpleMde.codemirror.on("cursorActivity", this.getCursor);

      const { events } = this.props;
      // Handle custom events
      events &&
        Object.entries(events).forEach(([eventName, callback]) => {
          if (eventName && callback) {
            this.simpleMde && this.simpleMde.codemirror.on(eventName, callback);
          }
        });
    }
  };

  getCursor = () => {
    // https://codemirror.net/doc/manual.html#api_selection
    if (this.props.getLineAndCursor) {
      this.props.getLineAndCursor(
        this.simpleMde.codemirror.getDoc().getCursor()
      );
    }
  };

  getMdeInstance = () => {
    if (this.props.getMdeInstance) {
      this.props.getMdeInstance(this.simpleMde);
    }
  };

  addExtraKeys = () => {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    if (this.props.extraKeys) {
      this.simpleMde.codemirror.setOption("extraKeys", this.props.extraKeys);
    }
  };

  render() {
    const {
      events,
      value,
      options,
      children,
      extraKeys,
      getLineAndCursor,
      getMdeInstance,
      label,
      onChange,
      id,
      name,
      ...rest
    } = this.props;
    return (
      <div id={`${this.id}-wrapper`} {...rest} ref={this.setElementWrapperRef}>
        {label && <label htmlFor={this.id}> {label} </label>}
        <textarea name={name} id={this.id} />
      </div>
    );
  }
}
