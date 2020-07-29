import React from 'react'
/* classes */
import classes from './classes.module.scss'
import { WithCategoriesToolbar } from '../../shared/wrappers/WithCategoriesToolbar'
import { ListFilter } from '../../shared/filters/list/ListFilter'
import {
  requestFiltersNomenclatures,
  requestGoods,
} from '../../store/reducers/goods/actions/actions'
import { TRootState } from '../../store'
import { connect } from 'react-redux'
import {
  TCountriesFilter,
  TPriceRangesFilter,
  TCategoriesFilter,
  TBrandsFilter,
} from '../../store/reducers/goods/typesData'
import { ListFilterRange } from '../../shared/filters/list/ListFilterRange'
import { isNotNaNs } from '../../store/helpers'
import { filtered, update } from './filters'
import { CatalogList } from './CatalogList'
import { HeaderCatalogList } from './HeaderCatalogList'
import {
  ICatalogContainer,
  IOnChangeCatalogContainer,
  IOnChangeIdsCatalogContainer,
} from './types'
/*  */
export const Container: React.FC<ICatalogContainer> = React.memo(
  ({
    idCaterogy,
    catalogListFilters,
    activeRootCategory,
    loading,
    requestFiltersNomenclatures,
    requestGoods,
    goodsCount,
  }) => {
    /* states */
    const [catalogView, setCatalogView] = React.useState<
      'vertical' | 'horizontal'
    >('vertical')
    const [visiblePricePin, setVisiblePricePin] = React.useState<boolean>(false)
    const [mousing, setMousing] = React.useState<boolean>(false)
    const [filters] = React.useState<string[]>([
      'categories',
      'volume',
      'price',
      'aging',
      'priceRanges',
      'countries',
      'brands',
    ])
    const [volume, setVolume] = React.useState({ max: 0, min: 0 })
    const [aging, setAging] = React.useState({ max: 0, min: 0 })
    const [price, setPrice] = React.useState({ max: 0, min: 0 })
    const [categoriesIds, setCategoriesIds] = React.useState<{ id: number }[]>(
      []
    )
    const [countriesIds, setCountriesIds] = React.useState<{ id: number }[]>([])
    const [brandsIds, setBrandsIds] = React.useState<{ id: number }[]>([])
    //
    const [categories, setCategories] = React.useState<
      TCategoriesFilter[] | null
    >(null)
    const [priceRanges, setPriceRanges] = React.useState<
      TPriceRangesFilter[] | null
    >(null)
    const [countries, setCountries] = React.useState<TCountriesFilter[] | null>(
      null
    )
    const [brands, setBrands] = React.useState<TBrandsFilter[] | null>(null)
    /* on changes */
    /* ================================================================== */
    const onChange: IOnChangeCatalogContainer = (field) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (isNotNaNs(event.target.value)) {
        const value = Math.abs(+event.target.value)
        if (field === 'volume') {
          setVolume((volume) => ({
            ...volume,
            [event.target.name]: value,
          }))
        }
        if (field === 'aging') {
          setAging((aging) => ({
            ...aging,
            [event.target.name]: value,
          }))
        }
        if (field === 'price') {
          setPrice((price) => ({
            ...price,
            [event.target.name]: value,
          }))
        }
      }
    }
    /* ================================================================== */
    const onChangeIds: IOnChangeIdsCatalogContainer = (field) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const id = event.currentTarget.name
      if (isNotNaNs(id)) {
        if (field === 'categories') {
          const checked = categoriesIds.find((d) => d.id === +id)
          checked
            ? setCategoriesIds(filtered(id, categoriesIds))
            : setCategoriesIds(update(id, categoriesIds))
        }
        if (field === 'countries') {
          const checked = countriesIds.find((d) => d.id === +id)
          checked
            ? setCountriesIds(filtered(id, countriesIds))
            : setCountriesIds(update(id, countriesIds))
        }
        if (field === 'brands') {
          const checked = brandsIds.find((d) => d.id === +id)
          checked
            ? setBrandsIds(filtered(id, brandsIds))
            : setBrandsIds(update(id, brandsIds))
        }
      }
    }
    const onChangeRange = (range: TPriceRangesFilter) => {
      setPrice(range)
      setVisiblePricePin(true)
    }
    /* effects */
    /* ================================================================== */
    React.useEffect(() => {
      catalogListFilters.volume && setVolume(catalogListFilters.volume)
      return () => setVolume({ max: 0, min: 0 })
    }, [catalogListFilters.volume])
    /* ================================================================== */
    React.useEffect(() => {
      catalogListFilters.aging && setAging(catalogListFilters.aging)
      return () => setAging({ max: 0, min: 0 })
    }, [catalogListFilters.aging])
    /* ================================================================== */
    React.useEffect(() => {
      catalogListFilters.price && setPrice(catalogListFilters.price)
      return () => setPrice({ max: 0, min: 0 })
    }, [catalogListFilters.price])
    /* ================================================================== */
    React.useEffect(() => {
      catalogListFilters.countries && setCountries(catalogListFilters.countries)
      return () => setCountries(null)
    }, [catalogListFilters.countries])
    /* ================================================================== */
    React.useEffect(() => {
      catalogListFilters.categories &&
        setCategories(catalogListFilters.categories)
      return () => setCategories(null)
      /* ================================================================== */
    }, [catalogListFilters.categories])
    React.useEffect(() => {
      catalogListFilters.brands && setBrands(catalogListFilters.brands)
      return () => setBrands(null)
    }, [catalogListFilters.brands])
    /* ================================================================== */
    React.useEffect(() => {
      catalogListFilters.priceRanges &&
        setPriceRanges(catalogListFilters.priceRanges)
      return () => setPriceRanges(null)
    }, [catalogListFilters.priceRanges])
    /* ================================================================== */
    React.useEffect(() => {
      const requestBody = {
        volume,
        price,
        aging,
        categories: categoriesIds.map((d) => ({ ...d, name: '' })),
        countries: countriesIds.map((d) => ({ ...d, value: '' })),
        brands: brandsIds.map((d) => ({ ...d, name: '' })),
      }
      !mousing && requestGoods(idCaterogy, requestBody)
    }, [
      idCaterogy,
      mousing,
      volume,
      price,
      aging,
      categoriesIds,
      countriesIds,
      brandsIds,
    ])
    /* ================================================================== */
    React.useEffect(() => {
      requestFiltersNomenclatures(idCaterogy, filters)
    }, [idCaterogy])
    /* ================================================================== */
    const {
      price: safePrice,
      volume: safeVolume,
      aging: safeAging,
    } = catalogListFilters
    /* ================================================================== */
    return (
      <WithCategoriesToolbar footer={true}>
        <HeaderCatalogList
          price={price}
          openPricePin={visiblePricePin}
          handleClosePricePin={() => setVisiblePricePin(false)}
          toggleCatalogView={setCatalogView}
          activeRootCategory={activeRootCategory}
          goodsCount={goodsCount}
        />
        <div className={classes.root}>
          <div className={classes.root__filters}>
            {price && (
              <ListFilterRange
                data={price}
                safe={safePrice}
                ranges={priceRanges}
                label="Цена"
                filterName="price"
                onChange={onChange('price')}
                mousing={setMousing}
                onChangeRange={onChangeRange}
              />
            )}
            {categories && (
              <ListFilter
                data={categories}
                label="Тип напитка"
                filterName="categories"
                ids={categoriesIds}
                onChange={onChangeIds('categories')}
              />
            )}
            {countries && (
              <ListFilter
                data={countries}
                label="Страна"
                filterName="countries"
                ids={countriesIds}
                onChange={onChangeIds('countries')}
              />
            )}
            {brands && (
              <ListFilter
                data={brands}
                label="Бренд"
                filterName="brands"
                ids={brandsIds}
                onChange={onChangeIds('brands')}
              />
            )}
            {volume && (
              <ListFilterRange
                data={volume}
                safe={safeVolume}
                label="Объём"
                filterName="volume"
                onChange={onChange('volume')}
                mousing={setMousing}
                onChangeRange={(range) => setVolume(range)}
              />
            )}
            {aging && (
              <ListFilterRange
                data={aging}
                safe={safeAging}
                label="Выдержка в ёмкости"
                filterName="aging"
                onChange={onChange('aging')}
                mousing={setMousing}
                onChangeRange={(range) => setAging(range)}
              />
            )}
          </div>
          <div className={classes.root__catalog}>
            <CatalogList view={catalogView} />
          </div>
        </div>
      </WithCategoriesToolbar>
    )
  }
)

const connector = connect(
  (state: TRootState) => ({
    catalogListFilters: state.goods.filters,
    loading: state.goods.loadingFilters,
    activeRootCategory: state.goods.activeRootCategory,
    goodsCount: state.goods.goods.length,
  }),
  {
    requestFiltersNomenclatures,
    requestGoods,
  }
)
const CatalogContainer = connector(Container)
export { CatalogContainer }
