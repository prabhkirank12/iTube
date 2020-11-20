import React from 'react';
import { connect } from 'react-redux';
import FixedSideBar from './fixed_sidebar';

export const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id]
})

export default connect(mapStateToProps, null)(FixedSideBar);