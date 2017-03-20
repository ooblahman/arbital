import React, { Component } from 'react'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

import backend from '../../util/backend'

import AuthenticatedHOC from '../hoc/AuthenticatedHOC'
import CreateArgument from './CreateArgument'

const styles = {
  addArgument: {
    margin: 12
  }
}

class CreateClaim extends Component {

  constructor(props) {
    super(props)
    this.state = {
      childOpen: false,
      submitted: false,
      args: [],
      claim: null
    }
  }

  render() {
    const { open } = this.props
    const { childOpen, submitted, claim, args } = this.state

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.close(null)}
      />,
      <FlatButton
        label={submitted ? "Already submitted" : "Submit"}
        primary={true}
        onTouchTap={() => this.submit(claim => this.close(claim))}
        disabled={submitted}
      />,
    ]

    return (
      <Dialog
        title="New claim"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={() => this.close(claim)}
      >
        <TextField
          hintText="Enter claim text"
          ref={elem => this.claimTextElem = elem}
          fullWidth={true}
        />
        <br />
        <RaisedButton
          label="Add argument for claim"
          style={styles.addArgument}
          onTouchTap={() => this.openChild()}
        />
        { childOpen && claim &&
          <CreateArgument
            linkedClaimId={claim.id}
            onRequestClose={(argument) => this.closeChild(argument)}
            open={childOpen}
          />
        }
      </Dialog>
    )
  }

  getClaimCreator() {
    const { args } = this.state
    const text = this.claimTextElem.input.value
    return {
      text,
      args: args.map(arg => arg.id)
    }
  }

  close(claim) {
    this.props.onRequestClose(claim)
  }

  submit(cb = (claim) => {}) {
    const { submitted } = this.state
    if (submitted) {
      cb(this.state.claim)
    } else {
      const { session } = this.props
      const claimCreator = this.getClaimCreator()
      const url = '/claims/create'
      backend
        .authenticate(session.id)
        .post(url, claimCreator, (err, response, body) => {
          if (err !== null) {
            throw err
          } else {
            if (response.statusCode == 200) {
              this.setState({submitted: true, claim: body})
              cb(body)
            } else {
              throw response.statusMessage
            }
          }
        })
    }
  }

  openChild() {
    this.submit(() => {
      this.setState({childOpen: true})
    })
  }

  closeChild(argument) {
    const { args } = this.state
    if (argument !== null) {
      args.push(argument)
    }
    this.setState({
      childOpen: false,
      args
    })
  }
}

export default AuthenticatedHOC(CreateClaim)