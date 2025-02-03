interface Box {
    height: number;
    left: number;
    top: number;
    width: number;
};
  

export interface BoundingBox {
    box: Box;
    class_name: string;
    confidence: number
    created_at: string;
    frame_id: number;
    frame_reference: string;
    id: number;
};