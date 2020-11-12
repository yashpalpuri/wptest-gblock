/**
 * BLOCK: Hero Section
 */

import './editor.scss'
import './style.scss'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { Fragment } from '@wordpress/element'
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { PanelBody, Button, ButtonGroup, __experimentalBoxControl as BoxControl } from '@wordpress/components'

const ALLOWED_MEDIA_TYPES = [ 'image' ]
const INNER_TEMPLATE = [
  [ 
    'core/heading', 
    { 
      placeholder: __( 'Click to edit Heading...!' ),
      content: __( 'The future of your business relies on being informed' ),
      align: 'center',
      style: {
        color: {
          text: '#FFFFFF'
        }
      },
    } 
  ],
  [
    'core/buttons', 
    {
      align: 'center'
    }, 
    [
      [
        'core/button', 
        {
          text: __( 'Request a quote' ),
          borderRadius: 1,
          style: {
            color: {
              background: '#277c9a'
            }
          }
        }
      ]
    ]
  ]
]

registerBlockType( 'wptest-gblock/hero-section', {
  title: __( 'Hero Section' ),
  icon: 'cover-image',
  category: 'common',
  keywords: [
    __( 'hero section' )
  ],
  supports: {
    align: [ 'full' ]
  },
  attributes: {
    align: {
      type: 'string',
      default: 'full'
    },
    backgroundID: {
      type: 'number',
    },
    backgroundUrl: {
      type: 'string',
    },
    padding: {
      type: 'object',
      default: {
        top: '10vh',
        left: '0',
        right: '0',
        bottom: '3vh',
      }
    }
  },
  edit ( { attributes, setAttributes, className, clientId } ) {
    const { backgroundID, backgroundUrl, padding } = attributes
    const onChangeImage = ( id ) => {
      const mediaID = id

      if( ! mediaID ) {
        setAttributes( { backgroundID: null, backgroundUrl: '' } )
        return
      } 

      wp.media.attachment( mediaID ).fetch().then( ( data ) => {
        setAttributes( { backgroundID: id, backgroundUrl: data.url } )
      } );
    }

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __( 'Background Image' ) }>
            {
              ( () => {
                if( ! backgroundUrl ) return 
                return (
                    <div className="__control-image-preview">
                        <img src={ backgroundUrl } alt="#" />
                    </div>
                )
              } )()
            }
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( media ) => { onChangeImage( media.id ) } }
                allowedTypes={ ALLOWED_MEDIA_TYPES }
                value={ backgroundID }
                render={ ( { open } ) => (
                    <ButtonGroup>
                        <Button isPrimary onClick={ open }>
                          { backgroundUrl ? __( 'Edit Image' ) : __( 'Select Image' ) }
                        </Button>
                        {
                          backgroundUrl && 
                          <Button style={ { color: 'red' } } onClick={ () => { onChangeImage( '' ) } }>{ __( 'Remove Image' ) }</Button>
                        }
                    </ButtonGroup>
                ) }
              />
            </MediaUploadCheck>
          </PanelBody>
          <PanelBody title={ __( 'Padding' ) } initialOpen={ false }>
            <BoxControl
            values={ padding }
            onChange={ ( value ) => setAttributes( { padding: value } ) }
            />
          </PanelBody>
        </InspectorControls>
        <div className={ [ 'myblock--hero-section', className ].join( ' ' ) } style={ ( () => {
          return {
            padding: `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }`
          }
        } )() }>
          <div className="backround-image-layer" style={ ( () => {
            if( ! backgroundUrl ) return
            return { 
              background: `url(${ backgroundUrl }) no-repeat center center / cover, #222` 
            }
          } )() } ></div>
          <div className="entry-container">
            <InnerBlocks
            template={ INNER_TEMPLATE }
            renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
            />
          </div>
        </div>
      </Fragment>
    )
  },
  save ( { attributes, className } ) {
    const { backgroundID, backgroundUrl, padding } = attributes
    return (
      <div className={ [ 'myblock--hero-section', className ].join( ' ' ) } style={ ( () => {
        return {
          padding: `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }`
        }
      } )() }>
        <div className="backround-image-layer" style={ ( () => {
          if( ! backgroundUrl ) return
          return { 
            background: `url(${ backgroundUrl }) no-repeat center center / cover, #222` 
          }
        } )() } ></div>
        <div className="entry-container">
          <InnerBlocks.Content />
        </div>
      </div>
    )
  }
} )