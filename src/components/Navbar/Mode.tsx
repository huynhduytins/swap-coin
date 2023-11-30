import { Modes } from '../../constants'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useMode } from '../../context/AppContext'

const Mode = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { mode, setMode } = useMode()

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (value: string) => {
    localStorage.setItem('mode', value)
    setMode(value)
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <img
          src={`/assets/icons/${
            mode === 'light' ? 'sun' : mode === 'dark' ? 'moon' : 'computer'
          }.svg`}
          alt="icon"
          className="w-5 h-5 active-theme"
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {Modes.map((el) => (
          <MenuItem
            onClick={() => handleClose(el.value)}
            className="flex items-center gap-4 px-2.5 "
            key={el.value}
          >
            <img
              src={el.icon}
              alt="icon"
              className={`w-4 h-4 ${mode === el.value && 'active-theme'}`}
            />
            <p
              className={`font-semibold ${
                mode === el.value ? 'text-primary-500' : ' text-light-500'
              }`}
            >
              {el.label}
            </p>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Mode
