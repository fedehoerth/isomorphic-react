import React from 'react';
import { renderRoutes } from 'react-router-config';

class DocumentTemplate extends React.Component {
  render () {
    return (
      <main>
        <header>
          Header Component
        </header>
        <section>
          {renderRoutes(this.props.route.routes, { ...this.props })}
        </section>
        <footer>
          Footer Component
        </footer>
      </main>
    )
  }
}

export default DocumentTemplate
