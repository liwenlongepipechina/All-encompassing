package com.project.arcface.model;

import androidx.annotation.NonNull;

import com.arcsoft.face.FaceInfo;

public class FacePreviewInfo {
    private FaceInfo faceInfo;
    private int trackId;

    public FacePreviewInfo(FaceInfo faceInfo, int trackId) {
        this.faceInfo = faceInfo;
        this.trackId = trackId;
    }

    public FaceInfo getFaceInfo() {
        return faceInfo;
    }

    public void setFaceInfo(FaceInfo faceInfo) {
        this.faceInfo = faceInfo;
    }


    public int getTrackId() {
        return trackId;
    }

    public void setTrackId(int trackId) {
        this.trackId = trackId;
    }

    @Override
    public String toString() {
        return "FacePreviewInfo{" +
                "faceInfo=" + faceInfo +
                ", trackId=" + trackId +
                '}';
    }
}
