class UsersController < ApplicationController
  skip_before_filter :handle_unverified_request, :only => :create
  before_action :get_user, except: [:index, :create]
  respond_to :html, :json

  def index
    @user = User.all
    respond_with(@users) do |format|
      format.json { render :json => @user.as_json }
      format.html
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :no_content}
    end
  end      

  def show
    respond_with(@user.as_json)
  end

  def update
    if @user.update_attributes(user_params)
      render json: @user.as_json, status: :ok 
    else
      render json: {user: @user.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: {status: :ok}
  end

  private

  def user_params
    params.fetch(:user, {}).permit(:firstname, :lastname)
  end

  def get_user
    @user = User.find(params[:id])
    render json: {status: :not_found} unless @user
  end
end
