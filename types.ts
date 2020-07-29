import {
  TGood,
  TCatalogListFilters,
} from '../../store/reducers/goods/typesData'
import { ICategory } from '../../store/reducers/root/typesData'
import {
  IrequestFiltersNomenclatures,
  IrequestGoods,
} from '../../store/reducers/goods/actions/types'

export interface ICatalogList {
  goods: TGood[]
  view: 'vertical' | 'horizontal'
}
export interface IHeaderCatalogList {
  price: {
    min: number
    max: number
  }
  openPricePin: boolean
  handleClosePricePin(): void
  toggleCatalogView(view: 'vertical' | 'horizontal'): void
  activeRootCategory: ICategory
  goodsCount: number
}
export interface IOnChangeCatalogContainer {
  (field: 'volume' | 'aging' | 'price'): (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
}
export interface IOnChangeIdsCatalogContainer {
  (field: 'categories' | 'countries' | 'brands'): (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
}
export interface ICatalogContainer {
  catalogListFilters: TCatalogListFilters
  loading: boolean
  idCaterogy: number
  requestFiltersNomenclatures: IrequestFiltersNomenclatures
  requestGoods: IrequestGoods
  activeRootCategory: ICategory
  goodsCount: number
}
