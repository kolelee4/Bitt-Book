import React, {Component} from 'react'
// import PropTypes from 'prop-types'

// Components
import {Editor, EditorState} from 'draft-js'

class BittEditor extends Component {
  constructor() {
    super()

    this.state = {
      editorState: EditorState.createEmpty()
    }

    this.onChange = (editorState) => this.setState({editorState})
  }
  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        autoFocus={true}
        onTouchTap={e => e.stopPropagation()}
        onChange={this.onChange}
      />
    )
  }
}

export default BittEditor
