# encoding: utf-8

class CommentFileUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
end
