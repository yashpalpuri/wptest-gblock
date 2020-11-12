/**
 * BLOCK: Client Logos
 */

import './editor.scss'
import './style.scss'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { Fragment } from '@wordpress/element'
import { InspectorControls, MediaPlaceholder, BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { PanelBody, SelectControl, Toolbar, ToolbarButton, IconButton } from '@wordpress/components'

registerBlockType( 'wptest-gblock/client-logos', {
  title: __( 'Client Logos' ),
  icon: 'star-filled',
  category: 'common',
  keywords: [
    __( 'client logos' )
  ],
  attributes: {
    columns: {
      type: 'number',
      default: 4
    },
    logos: {
      type: 'array',
      default: []
    }
  },
  edit ( { attributes, setAttributes, className, clientId } ) {
    const { columns, logos } = attributes

    /**
     * Update Logos
     * @param {*} images 
     */
    const onUpdateLogos = ( images ) => {
      if( images.length <= 0 ) {
        setAttributes( { logos: [] } )
      }

      let NewLogos = images.map( ( item ) => {
        return {
          id: item.id,
          url: item.url,
          alt: item.alt
        }
      } )
      console.log( NewLogos )
      setAttributes( { logos: NewLogos } ) 
    }

    /**
     * Remove Logos
     */
    const onRemoveLogos = () => {
      setAttributes( { logos: [] } )
    }

    const SelectLogoPlaceholder = ( _props ) => {
      return (
        <MediaPlaceholder 
        onSelect = { _props.onChange } 
        allowedTypes = { [ 'image' ] }
        multiple = { true }
        labels = { { title: __( 'Select Images' ) } }
        />
      )
    }
    return (
      <Fragment>
        <BlockControls>
          {
            /**
             * Toolbar
             */
            logos.length > 0 && 
            <Toolbar>
              <MediaUpload
              multiple
              gallery
              allowedTypes={ [ 'image' ] }
              value={ logos.map( ( img ) => img.id ) }
              onSelect={ onUpdateLogos }
              render={ ({ open }) => (
                <div>
                  <IconButton
                    className="components-toolbar__control"
                    label={ __( 'Edit logos' ) }
                    icon="edit"
                    onClick={ open }
                  />
                  <IconButton
                    className="components-toolbar__control"
                    label={ __( 'Delete All' ) }
                    icon="trash"
                    onClick={ onRemoveLogos }
                  />
                </div>
              ) }
              />
            </Toolbar>
          }
        </BlockControls>

        <InspectorControls>
          <PanelBody title={ __( 'Columns' ) }>
            <SelectControl
            value={ columns }
            onChange={ ( value ) => setAttributes( { columns: value } ) }
            options={ [
              { value: 2, label: '2 Columns' },
              { value: 3, label: '3 Columns' },
              { value: 4, label: '4 Columns' },
            ] }
            />
          </PanelBody>
        </InspectorControls>

        <div className={ [ 'myblock--client-logos', className ].join( ' ' ) }>
          {
            /** 
             * Select logos
             */
            logos.length == 0 &&
            <SelectLogoPlaceholder onChange={ onUpdateLogos } />
          }

          {
            /**
             * Preview logos grid
             */
            logos.length > 0 && 
            <div className="client-logos-container">
              <div className="client-logos-grid" style={ ( () => {
                return {
                  '--grid-col': columns
                }
              } )() }>
                {
                  logos.map( ( logo ) => {
                    return (
                      <div className="item" key={ logo.id }>
                        <img src={ logo.url } alt={ logo.alt } />
                      </div>
                    )
                  } )
                }
              </div>
            </div>
          }
        </div>
      </Fragment>
    )
  },
  save () {
    return null
  }
} )