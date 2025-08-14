import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToDifferentColumnAPI, deleteColumnDetailsAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { Typography } from '@mui/material'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6872b1006c3b43fdea53a04e'
    //call api
    fetchBoardDetailsAPI(boardId).then(board => {
      //sap xep cac thu tu cac column luon o day truoc khi dua du lieu xuong ben duoi cac component con
      board.columns = mapOrder( board.columns, board.columnOrderIds, '_id' )
      board.columns.forEach(column => {
        // khi f5 trang web can xu ly van de keo tha card vao mot column rong
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          //sap xep cac thu tu cac card luon o day truoc khi dua du lieu xuong ben duoi cac component con
          column.cards = mapOrder( column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])
  //func nay co nhiem vu goi api tao moi column va lam lai du lieu state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    // khi tao moi column thi no chua co card , can xu ly van de keo tha card vao mot column rong
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    //cap nhat lai state board
    // Phía Front-end chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
    // Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn
    // toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa. => Lúc này FE sẽ nhàn hơn.
    const newBoard ={ ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  //func nay co nhiem vu goi api tao moi card va lam lai du lieu state board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    //cap nhat lai state board
    // Phía Front-end chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
    // Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn
    // toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa. => Lúc này FE sẽ nhàn hơn.
    const newBoard ={ ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }
  //func nay co nhiem vu goi api va xu ly khi keo tha column xong
  //chi can goi api de cap nhat cai mang columnOrderIds cua board chua no
  const moveColumns = (dndOderedColumns) => {
    //cap nhat lai cho chuan du lieu state board
    const dndOderedColumnsIds = dndOderedColumns.map(c => c._id)
    const newBoard ={ ...board }
    newBoard.columns = dndOderedColumns
    newBoard.columnOrderIds = dndOderedColumnsIds
    setBoard(newBoard)
    //goi api updateboard
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }
  //khi di chuyen card trong cung mot column thi chi can goi api de cap nhat cai mang cardorderids cua column chua no
  const moveCardInTheSameColumn = (dndOderedCards, dndOderedCardIds, columnId) => {
    //cap nhat lai cho chuan du lieu state board
    const newBoard ={ ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOderedCards
      columnToUpdate.cardOrderIds = dndOderedCardIds
    }
    setBoard(newBoard)
    //goi api updatecolumn
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOderedCardIds })

  }
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOderedColumns) => {
    const dndOderedColumnsIds = dndOderedColumns.map(c => c._id)
    const newBoard ={ ...board }
    newBoard.columns = dndOderedColumns
    newBoard.columnOrderIds = dndOderedColumnsIds
    setBoard(newBoard)
    //goi api xu ly phia be
    let prevCardOrderIds = dndOderedColumns.find( c => c._id === prevColumnId )?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOderedColumns.find( c => c._id === nextColumnId )?.cardOrderIds
    })
  }
  const deleteColumnDetails = (columnId) => {
    //upd cho chuan du lieu state board
    const newBoard ={ ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)
    //goi api xu ly phia be
    deleteColumnDetailsAPI(columnId).then (res => {
      toast.success(res?.deleteResult)
    })
  }
  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }


  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}

        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns = {moveColumns}
        moveCardInTheSameColumn = {moveCardInTheSameColumn}
        moveCardToDifferentColumn = {moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}

export default Board
