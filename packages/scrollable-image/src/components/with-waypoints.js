import PropTypes from 'prop-types'
import React from 'react'
import { Waypoint } from 'react-waypoint'

const withWaypoints = WrappedComponent => {
  class WithWaypoints extends React.PureComponent {
    static propTypes = {
      debug: PropTypes.bool,
    }

    static defaultProps = {
      debug: false,
    }
    constructor(props) {
      super(props)
      this.state = {
        isActive: false,
        isScrollingFromTopToBottom: false,
      }
      this.waypointsPosition = {}
      this.setScrollState = this._setScrollState.bind(this)
      this.handleTopBoundaryPositionChange = this._handleTopBoundaryPositionChange.bind(
        this
      )
      this.handleBottomBoundaryPositionChange = this._handleBottomBoundaryPositionChange.bind(
        this
      )
    }

    componentWillUnmount() {
      this.waypointsPosition = undefined
    }

    _setScrollState({ isActive, verticalDirection }) {
      this.setState({
        isActive,
        verticalDirection,
      })
    }

    _setWaypointPosition(pos) {
      // TODO check keys
      this.waypointsPosition = Object.assign(this.waypointsPosition, pos)
    }

    _handleTopBoundaryPositionChange(position) {
      const { previousPosition, currentPosition } = position
      const { bottomBoundaryPosition } = this.waypointsPosition

      this._setWaypointPosition({ topBoundaryPosition: currentPosition })

      // top boundary enter to viewport
      if (currentPosition === Waypoint.inside) {
        if (previousPosition === Waypoint.above) {
          this.setScrollState({
            isActive: false,
            verticalDirection: 'up',
          })
        } else if (previousPosition === Waypoint.below) {
          this.setScrollState({
            isActive: false,
            verticalDirection: 'up',
          })
        }
        return
      }

      // top boundary leave from viewport
      if (previousPosition === Waypoint.inside) {
        if (currentPosition === Waypoint.above) {
          if (bottomBoundaryPosition === Waypoint.inside) return

          this.setScrollState({
            isActive: true,
          })
        } else if (currentPosition === Waypoint.below) {
          this.setScrollState({
            isActive: false,
            verticalDirection: 'up',
          })
        }
      }
    }

    _handleBottomBoundaryPositionChange(position) {
      const { previousPosition, currentPosition } = position
      const { topBoundaryPosition } = this.waypointsPosition

      this._setWaypointPosition({ bottomBoundaryPosition: currentPosition })

      // bottom boundary enter to viewport
      if (currentPosition === Waypoint.inside) {
        if (previousPosition === Waypoint.below) {
          // bottom boundary enter from below
          this.setScrollState({
            isActive: false,
            verticalDirection: 'down',
          })
        } else if (previousPosition === Waypoint.above) {
          // bottom boundary enter from above
          this.setScrollState({
            isActive: false,
            verticalDirection: 'down',
          })
        }
        return
      }

      // bottom boundary leave from viewport
      if (previousPosition === Waypoint.inside) {
        if (currentPosition === Waypoint.below) {
          // bottom boundary leave to below
          if (topBoundaryPosition === Waypoint.inside) return

          this.setScrollState({
            isActive: true,
          })
        } else if (currentPosition === Waypoint.above) {
          // bottom boundary leave to above
          this.setScrollState({
            isActive: false,
            verticalDirection: 'down',
          })
        }
      }
    }

    render() {
      const { isActive, verticalDirection } = this.state
      return (
        <>
          <Waypoint
            onPositionChange={this.handleTopBoundaryPositionChange}
            fireOnRapidScroll
            debug={this.props.debug}
          />
          <WrappedComponent
            {...this.props}
            isActive={isActive}
            verticalDirection={verticalDirection}
          />
          <Waypoint
            onPositionChange={this.handleBottomBoundaryPositionChange}
            fireOnRapidScroll
            debug={this.props.debug}
          />
        </>
      )
    }
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  WithWaypoints.displayName = `withWaypoints(${wrappedComponentName})`

  return WithWaypoints
}

export default withWaypoints
