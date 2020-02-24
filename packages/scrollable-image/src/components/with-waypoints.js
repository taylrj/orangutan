import React from 'react'
import { Waypoint } from 'react-waypoint'

// TODO: don't set active state, update refs style directly
const withWaypoints = WrappedComponent => {
  class WithWaypoints extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        isActive: false,
        verticalDirection: null,
      }
      this.setScrollState = this._setScrollState.bind(this)
      this.handleTopBoundaryEnter = this._handleTopBoundaryEnter.bind(this)
      this.handleTopBoundaryLeave = this._handleTopBoundaryLeave.bind(this)
      this.handleBottomBoundaryEnter = this._handleBottomBoundaryEnter.bind(
        this
      )
      this.handleBottomBoundaryLeave = this._handleBottomBoundaryLeave.bind(
        this
      )
    }

    _setScrollState({ isActive, verticalDirection }) {
      this.setState({
        isActive,
        verticalDirection,
      })
    }

    _handleTopBoundaryEnter({ previousPosition, currentPosition }) {
      // 4
      console.log('enter top boundary')
      console.log('prev:', previousPosition)
      console.log('curr:', currentPosition)
      console.log('=======================')
      if (
        previousPosition === Waypoint.above &&
        currentPosition === Waypoint.inside
      ) {
        this.setScrollState({
          isActive: false,
          verticalDirection: 'up',
        })
      }
    }

    _handleTopBoundaryLeave({ previousPosition, currentPosition }) {
      // 1
      console.log('leave top boundary:')
      console.log('prev:', previousPosition)
      console.log('curr:', currentPosition)
      console.log('=======================')
      if (
        previousPosition === Waypoint.inside &&
        currentPosition === Waypoint.above
      ) {
        this.setScrollState({
          isActive: true,
          verticalDirection: 'down',
        })
      }
    }

    _handleBottomBoundaryEnter({ previousPosition, currentPosition }) {
      // 2
      console.log('enter bottom boundary')
      console.log('prev:', previousPosition)
      console.log('curr:', currentPosition)
      console.log('=======================')
      if (
        previousPosition === Waypoint.below &&
        currentPosition === Waypoint.inside
      ) {
        this.setScrollState({
          isActive: false,
          verticalDirection: 'down',
        })
      }
    }

    _handleBottomBoundaryLeave({ previousPosition, currentPosition }) {
      // 3
      console.log('leave bottom boundary')
      console.log('prev:', previousPosition)
      console.log('curr:', currentPosition)
      console.log('=======================')
      if (
        previousPosition === Waypoint.inside &&
        currentPosition === Waypoint.below
      ) {
        this.setScrollState({
          isActive: true,
          verticalDirection: 'up',
        })
      }
    }

    render() {
      const { isActive, verticalDirection } = this.state
      // const WrappedComponentWithRef = React.forwardRef((props, ref) => {
      //  return (
      //    <WrappedComponent
      //      {...props}
      //      forwardedRef={ref}
      //      isActive={isActive}
      //      verticalDirection={verticalDirection}
      //    />
      //  )
      // })
      // console.log('this.wrapped:', this.wrapped)
      return (
        <>
          <Waypoint
            onEnter={this.handleTopBoundaryEnter}
            onLeave={this.handleTopBoundaryLeave}
            fireOnRapidScroll
          />
          <WrappedComponent
            {...this.props}
            isActive={isActive}
            verticalDirection={verticalDirection}
          />
          <Waypoint
            onEnter={this.handleBottomBoundaryEnter}
            onLeave={this.handleBottomBoundaryLeave}
            fireOnRapidScroll
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
