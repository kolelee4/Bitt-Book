// From material-ui source with custom changes

import React, {Component, cloneElement} from 'react'
import PropTypes from 'prop-types'
import transitions from 'material-ui/styles/transitions'
import EnhancedButton from 'material-ui/internal/EnhancedButton'
import Paper from 'material-ui/Paper'

function validateLabel(props, propName, componentName) {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.children && (props.label !== 0 && !props.label) && !props.icon) {
      return new Error(`Required prop label or children or icon was not specified in ${componentName}.`)
    }
  }
}

function getStyles(props, context, state) {
  const {
    baseTheme,
    button,
    raisedButton,
    borderRadius,
  } = context.muiTheme

  const {
    disabled,
    disabledBackgroundColor,
    disabledLabelColor,
    fullWidth,
    icon,
    label,
    labelPosition,
    primary,
    secondary,
    style,
  } = props

  let backgroundColor = raisedButton.color
  let labelColor = raisedButton.textColor

  if (disabled) {
    backgroundColor = disabledBackgroundColor || raisedButton.disabledColor
    labelColor = disabledLabelColor || raisedButton.disabledTextColor
  } else if (primary) {
    backgroundColor = raisedButton.primaryColor
    labelColor = raisedButton.primaryTextColor
  } else if (secondary) {
    backgroundColor = raisedButton.secondaryColor
    labelColor = raisedButton.secondaryTextColor
  } else {
    if (props.backgroundColor) {
      backgroundColor = props.backgroundColor
    }
    if (props.labelColor) {
      labelColor = props.labelColor
    }
  }

  const buttonHeight = (style && style.height) || (button.height)

  return {
    root: {
      display: 'inline-block',
      transition: transitions.easeOut(),
      minWidth: fullWidth ? '100%' : button.minWidth,
    },
    button: {
      height: buttonHeight,
      lineHeight: `${buttonHeight}px`,
      width: '100%',
      padding: 0,
      borderRadius,
      transition: transitions.easeOut(),
      backgroundColor: backgroundColor,
      textAlign: 'center',
    },
    label: {
      position: 'relative',
      opacity: 1,
      fontSize: raisedButton.fontSize,
      letterSpacing: 0,
      textTransform: raisedButton.textTransform || button.textTransform || 'uppercase',
      fontWeight: raisedButton.fontWeight,
      margin: 0,
      userSelect: 'none',
      paddingLeft: icon && labelPosition !== 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      paddingRight: icon && labelPosition === 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      color: labelColor,
    },
    icon: {
      verticalAlign: 'middle',
      marginLeft: label && labelPosition !== 'before' ? 12 : 0,
      marginRight: label && labelPosition === 'before' ? 12 : 0,
    },
    overlay: {
      height: buttonHeight,
      borderRadius,
      backgroundColor: backgroundColor, // Custom changes
      transition: transitions.easeOut(),
      top: 0,
    },
    ripple: {
      color: labelColor,
      opacity: !(primary || secondary) ? 0.1 : 0.16,
    },
  }
}

class RaisedButton extends Component {
  static muiName = 'RaisedButton'

  static propTypes = {
    backgroundColor: PropTypes.string,
    buttonStyle: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    containerElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    disableTouchRipple: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledBackgroundColor: PropTypes.string,
    disabledLabelColor: PropTypes.string,
    fullWidth: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.node,
    label: validateLabel,
    labelColor: PropTypes.string,
    labelPosition: PropTypes.oneOf([
      'before',
      'after',
    ]),
    labelStyle: PropTypes.object,
    /** @ignore */
    onMouseDown: PropTypes.func,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /** @ignore */
    onMouseUp: PropTypes.func,
    /** @ignore */
    onTouchEnd: PropTypes.func,
    /** @ignore */
    onTouchStart: PropTypes.func,
    /**
     * Callback function fired when the button is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the button.
     */
    onTouchTap: PropTypes.func,
    overlayStyle: PropTypes.object,
    primary: PropTypes.bool,
    rippleStyle: PropTypes.object,
    secondary: PropTypes.bool,
    style: PropTypes.object,
  }

  static defaultProps = {
    disabled: false,
    labelPosition: 'after',
    fullWidth: false,
    primary: false,
    secondary: false,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  state = {
    hovered: false,
    keyboardFocused: false,
    touched: false,
    initialZDepth: 0,
    zDepth: 0,
  }

  componentWillMount() {
    const zDepth = this.props.disabled ? 0 : 1
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
    })
  }

  componentWillReceiveProps(nextProps) {
    const zDepth = nextProps.disabled ? 0 : 1
    const nextState = {
      zDepth: zDepth,
      initialZDepth: zDepth,
    }

    if (nextProps.disabled) {
      nextState.hovered = false
    }

    this.setState(nextState)
  }

  // Custom changes
  handleMouseDown = (event) => {
    if (event.button === 0) {
      this.setState({
        zDepth: this.state.initialZDepth + 2,
      })
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event)
    }
  }

  // Custom changes
  handleMouseUp = (event) => {
    this.setState({
      zDepth: this.state.initialZDepth + 1,
    })
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event)
    }
  }

  handleMouseLeave = (event) => {
    if (!this.state.keyboardFocused) {
      this.setState({
        zDepth: this.state.initialZDepth,
        hovered: false,
      })
    }
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event)
    }
  }

  handleMouseEnter = (event) => {
    if (!this.state.keyboardFocused && !this.state.touched) {
      this.setState({
        hovered: true,
        zDepth: this.state.initialZDepth + 1
      })
    }
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event)
    }
  }

  handleTouchStart = (event) => {
    this.setState({
      touched: true,
      zDepth: this.state.initialZDepth + 2,
    })

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event)
    }
  }

  handleTouchEnd = (event) => {
    this.setState({
      touched: true,
      zDepth: this.state.initialZDepth,
    })

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event)
    }
  }

  handleKeyboardFocus = (event, keyboardFocused) => {
    const zDepth = (keyboardFocused && !this.props.disabled) ? this.state.initialZDepth + 1 : this.state.initialZDepth

    this.setState({
      zDepth: zDepth,
      keyboardFocused: keyboardFocused,
    })
  }

  render() {
    const {
      backgroundColor, // eslint-disable-line no-unused-vars
      buttonStyle,
      children,
      className,
      disabled,
      disabledBackgroundColor, // eslint-disable-line no-unused-vars
      disabledLabelColor, // eslint-disable-line no-unused-vars
      fullWidth, // eslint-disable-line no-unused-vars
      icon,
      label,
      labelColor, // eslint-disable-line no-unused-vars
      labelPosition,
      labelStyle,
      overlayStyle,
      primary, // eslint-disable-line no-unused-vars
      rippleStyle,
      secondary, // eslint-disable-line no-unused-vars
      style,
      ...other
    } = this.props

    const {prepareStyles} = this.context.muiTheme
    const styles = getStyles(this.props, this.context, this.state)
    const mergedRippleStyles = Object.assign({}, styles.ripple, rippleStyle)

    const buttonEventHandlers = disabled ? {} : {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      onMouseEnter: this.handleMouseEnter,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onKeyboardFocus: this.handleKeyboardFocus,
    }

    const labelElement = label && (
      <span style={prepareStyles(Object.assign(styles.label, labelStyle))} key="labelElement">
        {label}
      </span>
    )

    const iconCloned = icon && cloneElement(icon, {
      color: icon.props.color || styles.label.color,
      style: Object.assign(styles.icon, icon.props.style),
      key: 'iconCloned',
    })

    const enhancedButtonChildren = labelPosition === 'before' ?
    [
      labelElement,
      iconCloned,
      children,
    ] : [
      children,
      iconCloned,
      labelElement,
    ]

    return (
      <Paper
        className={className}
        style={Object.assign(styles.root, style)}
        zDepth={this.state.zDepth}
      >
        <EnhancedButton
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={Object.assign(styles.button, buttonStyle)}
          focusRippleColor={mergedRippleStyles.color}
          touchRippleColor={mergedRippleStyles.color}
          focusRippleOpacity={mergedRippleStyles.opacity}
          touchRippleOpacity={mergedRippleStyles.opacity}
        >
          <div
            ref="overlay"
            style={prepareStyles(Object.assign(styles.overlay, overlayStyle))}
          >
            {enhancedButtonChildren}
          </div>
        </EnhancedButton>
      </Paper>
    )
  }
}

export default RaisedButton
