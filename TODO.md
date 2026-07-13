- [x] Inspect current course create/update/delete paths (courseController + AdminDashboard)
- [ ] Update backend courseController to support per-field mode: thumbnailMode/previewVideoMode/notesMode/resourcesMode
- [ ] Update backend deleteCourse logic to delete only Cloudinary uploads (publicId-based)
- [ ] Update frontend AdminDashboard course form UI: Upload vs URL toggles for Thumbnail, Preview Video, Course Notes (PDF), Course Resources (PDF/ZIP/DOCX/PPT?)
- [ ] Wire frontend to send correct multipart fields + mode fields to backend
- [ ] Add preview UI for selected uploads (image/video + filename/progress placeholder)
- [ ] Validate URL inputs for preview video (YouTube/Vimeo/mp4/etc) and resource/notes (URL)
- [ ] Manual test matrix: create/edit/delete with Upload-only, URL-only, and switching Upload↔URL
- [ ] Ensure no existing API breaks and keep URL-only behavior identical


