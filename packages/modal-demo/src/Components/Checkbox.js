import React, { Component } from 'react';

export class CheckboxGroup extends Component {
    // componentWillReceiveProps(nextProps) {
    //     if (this.props !== nextProps) {
    //         setTimeout(() => this.forceUpdate());
    //     }
    // }

    render() {
        const {
            name,
            label,
            options,
            onChange,
            value,
        } = this.props;
        console.log("Prop Value: ", value);
        const update = (evt) => {
            console.log("Input Checkbox Event",evt)
            evt.preventDefault();
            evt.stopPropagation();
            onChange()
        };

        return (
            <div className="form-group clearfix">
                <dt className="form-label">
                    <label>{label}</label>
                </dt>
                <dd className="form-field">
                    {options.map((opt) => (
                        <label key={opt.value}>
                            <input
                                type="checkbox"
                                name={name}
                                value={opt.value}
                                onClick={(evt) => update(evt)}
                                checked={value.includes(opt.value)}
                            />
                            {opt.label}
                        </label>
                    ))}
                </dd>
                <label>
                  <button onClick={() => this.forceUpdate()} >FoceUpdate组件</button>
                </label>
            </div>
        );
    }
}

class CheckboxTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "123",
    }
    this.boxChange = this.boxChange.bind(this);
  }

  boxChange() {
    this.setState({ value: this.state.value === "123" ? "456" : "123" })
  }

  render() {
    const options = [
      { label: "嘻嘻", value: "1" },
      { label: "嘻嘻", value: "2" },
      { label: "呵呵", value: "5" }
    ]

    return (
      <div style={{ marginTop: "30px" }}>
        <label>
          <input type="checkbox" />
          点我
        </label>
        <CheckboxGroup options={options} onChange={this.boxChange} value={this.state.value || "213"} />
      </div>
    )
  }
};

export default CheckboxTest;
