import { useHubContext } from "@/contexts/Hub";
import { useFetcher } from "@/hooks/Fetcher"
import { IGalleryImage } from "@/interfaces/Hub/Gallery";
import React from "react";

export default function useGallery(images: IGalleryImage[], refreshImages: () => void) {

    const fetcher = useFetcher();

    const { currentDoor } = useHubContext();
    const [ currentTab, setCurrentTab ] = React.useState(0);
    const [ currentImage, setCurrentImage ] = React.useState<IGalleryImage>();
    const [ showPreview, setShowPreview ]  = React.useState(false);
    const [ isDeleting, setIsDeleting ]  = React.useState(false);

    const fileRef = React.useRef<HTMLInputElement>(null);

    const saveImage = async () => {

        if (fileRef.current && fileRef.current.files?.[0]) {

            const data = new FormData();

            data.append("data", fileRef.current.files?.[0]);
            data.append("asnNumber", currentDoor!.Asn);
            data.append("type", `${currentTab}`);

            await fetcher.POST('InboundImage/CreateInboundImage', data);
            refreshImages();

        }

    }

    const hasImages = (type: number) => images.filter((image) => image.Type === type).length > 0;

    const deletePreview = async (image: IGalleryImage) => {

        setCurrentImage(image);
        setIsDeleting(true);
        setShowPreview(true);
        

    }

    const deleteImage = async () => {

        await fetcher.POST('InboundImage/DeleteInboundImage', currentImage!.Id);
        setShowPreview(false);
        refreshImages();

    }

    const previewImage = (image: IGalleryImage) => {

        setCurrentImage(image);
        setIsDeleting(false);
        setShowPreview(true);
    
    }

    return {

        fileRef,
        showPreview,
        setShowPreview,
        currentTab,
        setCurrentTab,
        hasImages,
        currentImage,
        setCurrentImage,
        saveImage,
        deleteImage,
        previewImage,
        deletePreview,
        isDeleting

    }

}