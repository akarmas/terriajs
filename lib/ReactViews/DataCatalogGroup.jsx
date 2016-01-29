'use strict';
import DataCatalogItem from './DataCatalogItem.jsx';
import Loader from './Loader.jsx';
import ObserveModelMixin from './ObserveModelMixin';
import React from 'react';

const DataCatalogGroup = React.createClass({
    mixins: [ObserveModelMixin],

    propTypes: {
        group: React.PropTypes.object,
        previewedCatalogItem: React.PropTypes.object,
        onPreviewedCatalogItemChanged: React.PropTypes.func
    },

    toggleOpen(e) {
        this.props.group.toggleOpen();
    },

    renderGroup(group) {
        if (group.isOpen === true) {
            if (group.items && group.items.length > 0) {
                return group.items.map((member, i)=>{
                    if (member.isGroup) {
                        return (<DataCatalogGroup group={member}
                                                  key={i}
                                                  previewedCatalogItem={this.props.previewedCatalogItem}
                                                  onPreviewedCatalogItemChanged={this.props.onPreviewedCatalogItemChanged}
                                 />);
                    }
                    return (<DataCatalogItem item={member}
                                             key={i}
                                             previewedCatalogItem={this.props.previewedCatalogItem}
                                             onPreviewedCatalogItemChanged={this.props.onPreviewedCatalogItemChanged}
                            />);
                });
            }
            return <Loader/>;
        }
    },

    render() {
        const group = this.props.group;
        return (
            <li>
              <button className ={'btn btn-catalogue ' + (group.isOpen ? 'is-open' : '')} onClick={this.toggleOpen} >{group.name} <i className={'icon ' + (group.isOpen ? 'icon-chevron-down' : 'icon-chevron-right')}></i></button>
              <ul className="data-catalog-group list-reset">
                {this.renderGroup(group)}
              </ul>
            </li>
            );
    }
});

module.exports = DataCatalogGroup;