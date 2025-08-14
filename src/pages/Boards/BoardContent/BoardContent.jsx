import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  // closestCenter,
  pointerWithin,
  // rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState, useCallback, useRef } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE ={
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board, createNewColumn, createNewCard, moveColumns, moveCardInTheSameColumn, moveCardToDifferentColumn, deleteColumnDetails }) {
  //const pointerSensor = useSensor( PointerSensor, { activationConstraint:{ distance: 10 } } )
  //yeu cau chuot di chuyen 10px  thi moi  kich hoat  event, fix truong hop click bi goi event
  const mouseSensor = useSensor( MouseSensor, { activationConstraint:{ distance: 10 } } )
  //nhan giu 250ms va dung sai cua cam ung 500px thi moi kick hoat event
  const touchSensor = useSensor( TouchSensor, { activationConstraint:{ delay: 250, tolerance: 5 } } )
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns]= useState([])
  //cung mot thoi diem chi mot phan tu dang duoc keo ( column hoac card)
  const [activeDragItemId, setActiveDragItemId]= useState(null)
  const [activeDragItemType, setActiveDragItemType]= useState(null)
  const [activeDragItemData, setActiveDragItemData]= useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard]= useState(null)

  //diem va cham cuoi cung (xu ly thuat toan va cham)
  const lastOverId = useRef(null)

  useEffect(() => {
    //column da duoc sap xep o component cha
    setOrderedColumns(board.columns)
  }, [board])
  //tim mot cai column theo card id
  const findColumnByCardId =(cardId) => {
    //doan nay can luu y nen dung c.card thay vi c.cardOrderId boi vi o buoc handleDragOver chung ta se lam du lieu cho cards hoan chinh truoc roi moi tao ra cardOrderIds moi
    return orderedColumns.find(column => column?.cards?.map( card => card._id )?.includes(cardId))
  }
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumns(prevColumns => {
      //tim vi tri cua cai overcardId dich noi ma activeCard sap dc tha
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      // logic  tinh toan card moi
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
      //column cu
      if (nextActiveColumn) {
        //xoa card o column active
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        //cap nhat lai mang cardoderids cho chuan du lieu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      //column moi
      if (nextOverColumn) {
        //kiem tra xem card dang keo no co ton tai  o overcolumn chua, neu co thi can xoa no truoc
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //phai cap nhat lai chuan du lieu columnid trong card sau khi keo card giua 2 column khac nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id //cap nhat lai columnId cho card moi
        }
        //tiep theo la them cai card dang keo vao overcolumn theo vi tri index moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        //loai bo placeholder card neu co
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
        //cap nhat lai mang cardoderids cho chuan du lieu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      if (triggerFrom === 'handleDragEnd') {
        moveCardToDifferentColumn(activeDraggingCardId, oldColumnWhenDraggingCard._id, nextOverColumn._id, nextColumns)
      }
      return nextColumns
    })
  }
  //trigger khi bat dau keo  1 phan tu
  const handleDragStart = (event) => {
    // console.log('handleDragStart: , event')
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
  //trigger trong qua trinh keo  1 phan tu
  const handleDragOver = (event) => {
    //khong lam gi them neu dang keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // console.log('handleDragOver: , event')
    const { active, over } = event
    //can dam bao neu khong ton tai active hoac over (khi keo ra khoi pham vi container)thi khong lam gi (tranh crash trang)
    if (!active || !over) return
    // activeDraggingCard la cai card dang duoc keo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    //overCard la cai card dang tuong tac tren hoac duoi so voi cai card dang duoc keo o tren
    const { id: overCardId } = over
    //tim 2 cai column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    //neu khong ton tai 1 trong 2 column thi khong lam gi het , tranh crash trang
    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }
  //trigger khi ket thuc keo  1 phan tu
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: , event')
    const { active, over } = event
    //can dam bao neu khong ton tai active hoac over (khi keo ra khoi pham vi container)thi khong lam gi (tranh crash trang)
    if (!active || !over) return
    //xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard la cai card dang duoc keo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      //overCard la cai card dang tuong tac tren hoac duoi so voi cai card dang duoc keo o tren
      const { id: overCardId } = over
      //tim 2 cai column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      //neu khong ton tai 1 trong 2 column thi khong lam gi het , tranh crash trang
      if (!activeColumn || !overColumn) return
      //hanh dong keo tha card giua 2 column khac nhau
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        //keo tha card trong cung 1 column
        //lay vi tri cu (tu active)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId )
        //lay vi tri moi (tu over)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId )
        const dndOderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOderedCardIds = dndOderedCards.map(card => card._id)
        //goi update state de tranh delay
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          //tim toi column dang tha
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          //cap nhat lai 2 gia tri mang card va cardorderids trong targetColumn
          targetColumn.cards = dndOderedCards
          targetColumn.cardOrderIds = dndOderedCardIds
          return nextColumns
        })
        //
        moveCardInTheSameColumn(dndOderedCards, dndOderedCardIds, oldColumnWhenDraggingCard._id)
      }
    }
    //Xu ly keo tha column trong boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      //neu vi tri moi sau khi keo tha khac voi vi tri ban dau
      if (active.id !== over.id) {
        //lay vi tri cu (tu active)
        const oldColumnIndex = orderedColumns.findIndex(c => c._id ===active.id )
        //lay vi tri moi (tu over)
        const newColumnIndex = orderedColumns.findIndex(c => c._id ===over.id )
        //dung arraymove cua thg dnd kit de sap xep lai mang column ban dau
        const dndOderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        //cap nhat lai state columns ban dau sau khi keo tha
        setOrderedColumns(dndOderedColumns)
        // 3 dong nay de xu ly du lieu goi api
        // const dndOderedColumnsIds = dndOderedColumns.map(c => c._id)
        // console.log('dndOderedColumns:', dndOderedColumns)
        // console.log('dndOderedColumnsIds:', dndOderedColumnsIds)

        moveColumns(dndOderedColumns)

      }
    }
    //nhung du lieu sau khi keo tha se luon phai dua ve gia tri null mac dinh ban dau
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ style: { active: { Opacity: 0.5 } } })
  }
  //args = arguments = cac boi so tham so
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType ===ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    const pointerIntersections = pointerWithin(args)
    if (!pointerIntersections?.length) return
    // thuat toan phat hien va cham se tra ve 1 mang cac va cham o day
    // const intersections = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : rectIntersection(args)
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0?.id]

      }

      lastOverId.current = overId
      return [{ id: overId }]
    }
    //neu overid la null thi se tra ve mang rong
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])
  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      //tu custom nang cao thuat toan phat hien va cham
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: ( theme) => (theme.palette.mode =='dark'? '#34495e': '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns
          columns = { orderedColumns}
          createNewColumn = {createNewColumn}
          createNewCard = {createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
