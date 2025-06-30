import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color:'white',
  bgcolor:'transparent',
  border: 'none',
  padding: '5px ',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}


function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflow: 'auto',
      bgcolor: ( theme) => (theme.palette.mode =='dark'? '#34495e': '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Khoa hoc tobi "
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon/>}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon/>}
          label="Add to google drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon/>}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon/>}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'primary.50'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border:'none'
            }
          }}
        >
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://yt3.ggpht.com/yti/ANjgQV_k1io7n5dpe3Fq7hlybah_GpbJHbveT4gVOLf8fT9LkqE=s88-c-k-c0x00ffffff-no-rj"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/479491645_1996701087508729_5074682762410612375_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=vGQqLQJRAt4Q7kNvwEdJVFh&_nc_oc=AdltVOuv9goGISlNC8pIlAFjoU16lYOS8jBd2pKTnMBhM8WqW1pM65Bv82A6WXcZeHE&_nc_zt=24&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=2hBmtEvmtE-diWBCjvwjvA&oh=00_AfPil8CECrioQKmGIW2iQgEmziwkySjqhh1lyylE3F7Lag&oe=685F6E48"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/495027497_1742606120012980_899123177403028429_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=1d2534&_nc_ohc=6UoUrTMgiL0Q7kNvwFeibdg&_nc_oc=AdknfrtDUhbHpHnNzHSukcxXrf-3TDORAQ-sEHJnXTU--GNTTWL4mcrMFopVd2RCLxY&_nc_zt=24&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=-EAwvQANpc4nQ0dd1BurvA&oh=00_AfOoWIDwcmUYn7SZ6t5T9Z4emEzi-a-3NaFPTyXwMyeo7A&oe=685F7EDC"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/295938545_1474290323035397_528555683095104869_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=67nz1dxeBVUQ7kNvwHzuXyc&_nc_oc=Adm5u_1Mi7pWrORpU_JK-KzzhLGv1oo6NC9vVxk-m6v42Yzln76HEz8LD_pZoBtKQpg&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=xiA2jHTKklOhSsNS4k5WKg&oh=00_AfNDYWE0fGTnGCnR4SYN6d39DcxEuaZPffETxdbycsEbGA&oe=685F862F"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/119899917_1005985749865859_3467866507643683807_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=5-f31IK67OkQ7kNvwFvTspD&_nc_oc=Adn8TCR9qHHPzXrZd7q_sMbXxJT6ueT1HgCxSGZOq8ffIbauYMd-62mi6LpJp_rrV_Q&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=D3aGb6KmmfL0rUK7YD8YMQ&oh=00_AfNrTKLp2F3hAnRBxqm02tucZ-NGToythgjvpN2_55KS_g&oe=688112B1"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t1.6435-9/101030214_909268909537544_3186375591964180480_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=99zUwemSE-AQ7kNvwEZLely&_nc_oc=Adm1KvTgrPyspW-hDJa0X68_mYWlynRdiHbrMx8o9b-Osf098gq2ydaEc4JMzXli_78&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=iS717HcpklHPQO6lCT-kvw&oh=00_AfNYZTqn9PIGrxS6daAKgMGQiGdrEpHp2gjMYQJp5lia1g&oe=68811A42"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://yt3.ggpht.com/yti/ANjgQV_k1io7n5dpe3Fq7hlybah_GpbJHbveT4gVOLf8fT9LkqE=s88-c-k-c0x00ffffff-no-rj"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/479491645_1996701087508729_5074682762410612375_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=vGQqLQJRAt4Q7kNvwEdJVFh&_nc_oc=AdltVOuv9goGISlNC8pIlAFjoU16lYOS8jBd2pKTnMBhM8WqW1pM65Bv82A6WXcZeHE&_nc_zt=24&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=2hBmtEvmtE-diWBCjvwjvA&oh=00_AfPil8CECrioQKmGIW2iQgEmziwkySjqhh1lyylE3F7Lag&oe=685F6E48"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/495027497_1742606120012980_899123177403028429_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=1d2534&_nc_ohc=6UoUrTMgiL0Q7kNvwFeibdg&_nc_oc=AdknfrtDUhbHpHnNzHSukcxXrf-3TDORAQ-sEHJnXTU--GNTTWL4mcrMFopVd2RCLxY&_nc_zt=24&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=-EAwvQANpc4nQ0dd1BurvA&oh=00_AfOoWIDwcmUYn7SZ6t5T9Z4emEzi-a-3NaFPTyXwMyeo7A&oe=685F7EDC"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/295938545_1474290323035397_528555683095104869_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=67nz1dxeBVUQ7kNvwHzuXyc&_nc_oc=Adm5u_1Mi7pWrORpU_JK-KzzhLGv1oo6NC9vVxk-m6v42Yzln76HEz8LD_pZoBtKQpg&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=xiA2jHTKklOhSsNS4k5WKg&oh=00_AfNDYWE0fGTnGCnR4SYN6d39DcxEuaZPffETxdbycsEbGA&oe=685F862F"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/119899917_1005985749865859_3467866507643683807_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=5-f31IK67OkQ7kNvwFvTspD&_nc_oc=Adn8TCR9qHHPzXrZd7q_sMbXxJT6ueT1HgCxSGZOq8ffIbauYMd-62mi6LpJp_rrV_Q&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=D3aGb6KmmfL0rUK7YD8YMQ&oh=00_AfNrTKLp2F3hAnRBxqm02tucZ-NGToythgjvpN2_55KS_g&oe=688112B1"
            />
          </tooltip>
          <tooltip title="Tobidangiu">
            <Avatar
              alt="Tobidangiu"
              src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t1.6435-9/101030214_909268909537544_3186375591964180480_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=99zUwemSE-AQ7kNvwEZLely&_nc_oc=Adm1KvTgrPyspW-hDJa0X68_mYWlynRdiHbrMx8o9b-Osf098gq2ydaEc4JMzXli_78&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=iS717HcpklHPQO6lCT-kvw&oh=00_AfNYZTqn9PIGrxS6daAKgMGQiGdrEpHp2gjMYQJp5lia1g&oe=68811A42"
            />
          </tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
