import React from 'react'
import PropTypes from 'prop-types'
import TechnologiesPageTemplate from '../../components/TechnologiesPageTemplate'

const TechnologiesPagePreview = ({ entry, widgetFor }) => (
  <TechnologiesPageTemplate
    title={entry.getIn(['data', 'title'])}
    meta_title={entry.getIn(['data', 'meta_title'])}
    meta_description={entry.getIn(['data', 'meta_description'])}
    content={widgetFor('body')}
  />
)

TechnologiesPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default TechnologiesPagePreview
