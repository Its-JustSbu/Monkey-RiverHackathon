import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export interface tiles {
    id: number
    title: string
    description: string
}

function TileCard(tile: tiles) {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
        <Card>
          <CardActionArea
            onClick={() => setSelectedCard(tile.id)}
            data-active={selectedCard === tile.id ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {tile.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tile.description}
              </Typography>
              <button
                  style={{
                    background: "#1976d2",
                  }}
                  onClick={() => alert(`Edit card ${tile.id}`)}
                >
                  Edit
                </button>
                <button
                  style={{
                    background: "#d32f2f",
                  }}
                  onClick={() => alert(`Delete card ${tile.id}`)}
                >
                  Delete
                </button>
            </CardContent>
          </CardActionArea>
        </Card>
    </Box>
  );
}

export default TileCard;