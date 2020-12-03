import PropTypes from 'prop-types'
import React from 'react'
import merge from 'lodash/merge'
import { Waypoint } from 'react-waypoint'

const _ = {
  merge,
}

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
        childrenAligned: 'top',
      }
      this.waypointsPosition = {
        topBoundaryPosition: undefined,
        bottomBoundaryPosition: undefined,
      }
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

    _setScrollState({ isActive, childrenAligned }) {
      this.setState({
        isActive,
        childrenAligned,
      })
    }

    _setWaypointPosition(pos) {
      this.waypoints = _.merge(this.waypointsPosition, pos)
    }

    _handleTopBoundaryPositionChange(position) {
      const { previousPosition, currentPosition } = position
      // const { bottomBoundaryPosition } = this.waypointsPosition

      // user scrolls from top to bottom
      // image is supposed to be in the viewport
      // set it fixed
      if (
        (previousPosition === Waypoint.inside ||
          previousPosition === Waypoint.below) &&
        currentPosition === Waypoint.above
      ) {
        this.setScrollState({
          isActive: true,
        })
        return
      }

      // if user is not scrolling from top to bottom
      // and position has been changed
      // set the image to top
      this.setScrollState({
        isActive: false,
        childrenAligned: 'top',
      })

      // switch (currentPosition) {
      //  // if current position is inside viewport
      //  // set image fixed
      //  case Waypoint.inside:
      //    this.setScrollState({
      //      isActive: true,
      //    })
      //    break
      //  // if current position is above viewport
      //  // and previous position is either inside or below,
      //  // it means that user scrolls from top to bottom
      //  // and image enters the viewport
      //  // set image fixed
      //  case Waypoint.above:
      //    if (
      //      previousPosition === Waypoint.inside ||
      //      previousPosition === Waypoint.below
      //    ) {
      //      this.setScrollState({
      //        isActive: true,
      //      })
      //    }
      //    break
      //  case Waypoint.below:
      //  default: {
      //    this.setScrollState({
      //      isActive: false,
      //      childrenAligned: 'top',
      //    })
      //  }
      // }

      // this._setWaypointPosition({ topBoundaryPosition: currentPosition })

      /// / top boundary enter to viewport
      // if (currentPosition === Waypoint.inside) {
      //  if (previousPosition === Waypoint.above) {
      //    this.setScrollState({
      //      isActive: false,
      //      childrenAligned: 'top',
      //    })
      //  } else if (previousPosition === Waypoint.below) {
      //    this.setScrollState({
      //      isActive: false,
      //      childrenAligned: 'top',
      //    })
      //  }
      //  return
      // }

      /// / top boundary leave from viewport
      // if (previousPosition === Waypoint.inside) {
      //  if (currentPosition === Waypoint.above) {
      //    if (bottomBoundaryPosition === Waypoint.inside) return
      //    this.setScrollState({
      //      isActive: true,
      //    })
      //  } else if (currentPosition === Waypoint.below) {
      //    this.setScrollState({
      //      isActive: false,
      //      childrenAligned: 'top',
      //    })
      //  }
      // }
    }

    _handleBottomBoundaryPositionChange(position) {
      const { previousPosition, currentPosition } = position
      // const { topBoundaryPosition } = this.waypointsPosition

      // user scrolls from bottom to top
      // image is supposed to be in the viewport
      // set it fixed
      if (
        (previousPosition === Waypoint.inside ||
          previousPosition === Waypoint.above) &&
        currentPosition === Waypoint.below
      ) {
        this.setScrollState({
          isActive: true,
        })
        return
      }

      // if user is not scrolling from bottom to top
      // and the position has been changed
      // set the image to bottom
      this.setScrollState({
        isActive: false,
        childrenAligned: 'bottom',
      })

      // switch (currentPosition) {
      //  case Waypoint.inside:
      //    // if current position is inside viewport
      //    // set image fixed
      //    this.setScrollState({
      //      isActive: true,
      //    })
      //    break
      //  case Waypoint.below:
      //    // if current position is below viewport
      //    // and previous position is either inside or above,
      //    // it means that user scrolls from bottom to top
      //    // and image enters the viewport
      //    // set image fixed
      //    if (
      //      previousPosition === Waypoint.inside ||
      //      previousPosition === Waypoint.above
      //    ) {
      //      this.setScrollState({
      //        isActive: true,
      //      })
      //    }
      //    break
      //  case Waypoint.above:
      //  default: {
      //    this.setScrollState({
      //      isActive: false,
      //      childrenAligned: 'bottom',
      //    })
      //  }
      // }

      // this._setWaypointPosition({ bottomBoundaryPosition: currentPosition })

      /// / bottom boundary enter to viewport
      // if (currentPosition === Waypoint.inside) {
      //  if (previousPosition === Waypoint.below) {
      //    // bottom boundary enter from below
      //    this.setScrollState({
      //      isActive: false,
      //      childrenAligned: 'bottom',
      //    })
      //  } else if (previousPosition === Waypoint.above) {
      //    // bottom boundary enter from above
      //    this.setScrollState({
      //      isActive: false,
      //      childrenAligned: 'bottom',
      //    })
      //  }
      //  return
      // }

      /// / bottom boundary leave from viewport
      // if (previousPosition === Waypoint.inside) {
      //  if (currentPosition === Waypoint.below) {
      //    // bottom boundary leave to below
      //    if (topBoundaryPosition === Waypoint.inside) return
      //    this.setScrollState({
      //      isActive: true,
      //    })
      //  } else if (currentPosition === Waypoint.above) {
      //    // bottom boundary leave to above
      //    this.setScrollState({
      //      isActive: false,
      //      childrenAligned: 'bottom',
      //    })
      //  }
      // }
    }

    render() {
      const { isActive, childrenAligned } = this.state
      return (
        <>
          <Waypoint
            bottomOffset="99%"
            onPositionChange={this.handleTopBoundaryPositionChange}
            fireOnRapidScroll
            debug={this.props.debug}
          />
          <WrappedComponent
            {...this.props}
            isActive={isActive}
            childrenAligned={childrenAligned}
          />
          <Waypoint
            topOffset="99%"
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
