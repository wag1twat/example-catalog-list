import React from 'react'
import classes from './HeaderCatalogList.module.scss'
import {
  PanelsIcon,
  BurgerIcon,
  CloseTooltipPriceIcon,
} from '../../styleguide/icons/icons'
import clsx from 'clsx'
import { IHeaderCatalogList } from './types'

export const HeaderCatalogList: React.FC<IHeaderCatalogList> = React.memo(
  ({
    price,
    openPricePin,
    goodsCount,
    activeRootCategory,
    handleClosePricePin,
    toggleCatalogView,
  }) => {
    const [panelViev, setPanelView] = React.useState<boolean>(true)
    const [listView, setListView] = React.useState<boolean>(false)
    const activePanelViewClass = clsx({
      [classes.active_svg]: panelViev,
      [classes.unactive_svg]: !panelViev,
    })
    const activeListViewClass = clsx({
      [classes.active_svg]: listView,
      [classes.unactive_svg]: !listView,
    })
    const setView = (view: 'vertical' | 'horizontal') => () => {
      setListView((view) => !view)
      setPanelView((view) => !view)
      toggleCatalogView(view)
    }
    return (
      <div className={classes.root}>
        <div className={classes.root__box_title}>
          <div className={classes.root__box_title__name}>
            <span>{activeRootCategory.name}</span>
            &nbsp;
            <span>{`(${goodsCount} товаров)`}</span>
          </div>
          {openPricePin && (
            <div className={classes.root__box_title__price}>
              <span>
                <span>{price.min}&nbsp;₽</span>
                <span>&nbsp;-&nbsp;</span>
                <span>{price.max}&nbsp;₽</span>
              </span>
              <button onClick={handleClosePricePin}>
                <CloseTooltipPriceIcon />
              </button>
            </div>
          )}
        </div>
        <div className={classes.root__toggle_views}>
          <div className={classes.box_toggle_views_select}>List</div>
          <div className={classes.box_toggle_views_btn}>
            <button onClick={setView('vertical')}>
              <PanelsIcon className={activePanelViewClass} />
            </button>
          </div>
          <div className={classes.box_toggle_views_btn}>
            <button onClick={setView('horizontal')}>
              <BurgerIcon className={activeListViewClass} />
            </button>
          </div>
        </div>
      </div>
    )
  }
)
