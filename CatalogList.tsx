import React from 'react'
/* classes */
import classes from './CatalogList.module.scss'
/*  */
import { connect } from 'react-redux'
import { TRootState } from '../../store'
import { ICatalogList } from './types'
import { isArrays } from '../../store/helpers'
import { VerticalBottleCard } from '../../shared/cards/bottle/VerticalBottleCard'
import { TGood } from '../../store/reducers/goods/typesData'
import { HorizontalBottleCard } from '../../shared/cards/bottle/HorizontalBottleCard'
import clsx from 'clsx'

const Container: React.FC<ICatalogList> = React.memo(({ goods, view }) => {
  const Bottle = (data: TGood) => {
    if (view === 'vertical') return <VerticalBottleCard data={data} />
    if (view === 'horizontal') return <HorizontalBottleCard data={data} />
  }
  const rootClass = clsx({
    [classes.vertical]: view === 'vertical',
    [classes.horizontal]: view === 'horizontal',
  })
  return (
    <div className={rootClass}>
      {isArrays(goods) &&
        goods.map((g, index) => (
          <div key={g.id} className={clsx(rootClass, classes.box)}>
            {Bottle(g)}
          </div>
        ))}
    </div>
  )
})
const connector = connect(
  (state: TRootState) => ({
    goods: state.goods.goods,
  }),
  {}
)
const CatalogList = connector(Container)
export { CatalogList }
