import React, { Component } from 'react';
import OptionsView from './OptionsView';
import { connect } from 'react-redux';
import * as optionsActions from 'app/actions/optionsActions';

class OptionsContainer extends Component {
    constructor(props) {
        super(props);
    }    
    render() {
        return <OptionsView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        rows: state.optionsReducer.rows,
        cols: state.optionsReducer.cols,
        practiceBothway: state.optionsReducer.practiceBothway,
        languagePack: state.optionsReducer.languagePack,        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeNumberRows: (rows) => dispatch(optionsActions.changeNumberRows(rows)),
        changeNumberCols: (cols) => dispatch(optionsActions.changeNumberCols(cols)),
        togglePracticeBothway: () => dispatch(optionsActions.togglePracticeBothway()),
        setLanguagePack: (languagePack) => dispatch(optionsActions.setLanguagePack(languagePack)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionsContainer);