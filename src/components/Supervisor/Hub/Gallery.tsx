import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar, Modal, Stack, Tab, Tabs, Typography, Zoom } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Check, Delete, ImageSearch } from "@mui/icons-material";
import { IGalleryImage } from "@/interfaces/Hub/Gallery";
import useGallery from "@/hooks/Supervisor/Hub/Gallery";

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Gallery(props: { open: boolean, close: () => void, images: IGalleryImage[], refreshImages: () => void }) {

    const gallery = useGallery(props.images, props.refreshImages);

    return (

        <Dialog open={props.open}>
            <DialogTitle>Image Gallery</DialogTitle>
            <IconButton 
                size="small" 
                onClick={props.close}
                sx={{ position: 'absolute', right: 8, top: 8 }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Tabs 
                    value={gallery.currentTab} 
                    onChange={(event: React.SyntheticEvent, newValue: number) => gallery.setCurrentTab(newValue)}
                >

                    {
                        ['Outside', 'Inside'].map((tab, idx) => (
                            <Tab 
                                key={idx}
                                value={idx}
                                iconPosition="start"
                                disabled={idx === 1 && !gallery.hasImages(0)}
                                icon={gallery.hasImages(idx) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                                label={tab} 
                            />
                        ))
                    }
                    
                </Tabs>

                {

                    props.images.filter((image) => image.Type === gallery.currentTab).length === 0 ? (

                        <Stack width={500} height={300} alignItems={'center'} justifyContent={'center'}>
                            <ImageSearch sx={{ color: 'GrayText', fontSize: '150pt' }} />
                            <Typography variant='h6' color='primary'>No Images Available</Typography>
                        </Stack>

                    ) : (

                        <ImageList cols={3} rowHeight={150} sx={{ width: 500, height: 300, scrollbarWidth: 'thin' }} >
                            {
                                props.images?.filter((image) => image.Type === gallery.currentTab).map((image) => (
                                    <ImageListItem key={image.Id}>
                                        <img
                                            src={image.ImageName}
                                            alt={"image"}
                                            loading="lazy"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                maxHeight: "100%",
                                                transition: "transform 0.3s ease",
                                            }}
                                            onClick={() => gallery.previewImage(image)}
                                        />
                                        <ImageListItemBar
                                            sx={{
                                                background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}
                                            title={image.ImageType}
                                            position="top"
                                            actionPosition="right"
                                            actionIcon={
                                                <IconButton
                                                    disabled={props.images.filter((image) => image.Type === gallery.currentTab).length === 1}
                                                    onClick={() => gallery.deletePreview(image)}
                                                    sx={{ color: 'white' }}
                                                    aria-label={`star ${image.ImageType}`}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            }
                                            
                                        />
                                    </ImageListItem>

                                ))
                            }
                        </ImageList>

                    )

                }

            </DialogContent>
            <DialogActions>
                <input 
                    ref={gallery.fileRef}
                    type="file" 
                    accept='image/*'
                    capture='environment'
                    onChange={gallery.saveImage}
                    style={{ display: 'none' }} 
                />
                <Button 
                    variant="contained" 
                    startIcon={<AddAPhotoIcon />}
                    onClick={() => gallery.fileRef.current?.click()}
                >
                    Upload Photos
                </Button>
            </DialogActions>

            <Modal open={gallery.showPreview} onClose={() => !gallery.isDeleting && gallery.setShowPreview(false)}>

                <Box sx={{ position: 'absolute', width: '80%', height: '80%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Zoom in={gallery.showPreview} onClick={() => !gallery.isDeleting && gallery.setShowPreview(false)}>
                        <Box 
                            sx={{ width: '100%', height: '100%', backgroundImage: `url(${gallery.currentImage?.ImageName})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center', borderRadius: '20px', alignContent: 'end', textAlign: 'center' }}
                        >

                            {

                                gallery.isDeleting && 
                                <Stack color='white' spacing={2} paddingY={2} sx={{ backgroundColor: 'red', opacity: 0.8, borderRadius: '20px' }}>
                                    <Typography variant="h5" color="inherit">Are you sure you want to delete this image?</Typography>
                                    <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                                        <Button 
                                            variant="contained" 
                                            color="inherit" 
                                            onClick={gallery.deleteImage}
                                            sx={{ color: 'primary.main', fontWeight: 'bold' }} 
                                        >
                                            Yes
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="inherit" 
                                            onClick={() => gallery.setShowPreview(false)}
                                            sx={{ color: 'primary.main', fontWeight: 'bold' }} 
                                        >
                                            No
                                        </Button>
                                    </Stack>
                                </Stack>

                            }

                        </Box>
                    </Zoom>
                </Box>

            </Modal>

        </Dialog>

    );

}