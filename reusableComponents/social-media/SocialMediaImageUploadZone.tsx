"use client"

import { useRef } from "react"
import { ImageSquare, Trash } from "phosphor-react"

interface SocialMediaImageUploadZoneProps {
  images: string[]
  onAddImages: (newUrls: string[]) => void
  onRemoveImage: (index: number) => void
}

export default function SocialMediaImageUploadZone({
  images,
  onAddImages,
  onRemoveImage,
}: SocialMediaImageUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const valid = files.filter((f) => f.size <= 10 * 1024 * 1024)
    const allowed = valid.slice(0, 5 - images.length)
    if (allowed.length > 0) {
      onAddImages(allowed.map((f) => URL.createObjectURL(f)))
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative rounded-xl overflow-hidden h-20 bg-gray-50 border border-gray-200">
              <img src={img} alt="Attachment" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onRemoveImage(idx)}
                className="absolute top-1 right-1 p-1 rounded-md bg-black/60 text-white hover:bg-rose-600 transition-colors cursor-pointer"
              >
                <Trash size={12} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < 5 && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 hover:border-[#5B50EC]/60 hover:bg-[#EEF2FF]/20 rounded-2xl p-3 sm:p-3.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-1.5 text-[#5B50EC] font-semibold text-xs sm:text-sm">
            <ImageSquare size={18} weight="bold" />
            <span>{images.length === 0 ? "Add Images" : "Add More Images"} ({images.length}/5)</span>
          </div>
          <span className="text-[11px] text-gray-400 text-center">Up to 5 images • Max 10 MB per image</span>
          <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>
      )}
    </div>
  )
}

