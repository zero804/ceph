#!/bin/bash -ex

RUN_TIME=300		# approximate duration of run (seconds)

[ $# -eq 1 ] && RUN_TIME="$1"

IMAGE_NAME="image-$$"
IMAGE_SIZE="1024"	# MB

function get_time() {
	date '+%s'
}

function times_up() {
	local end_time="$1"

	test $(get_time) -ge "${end_time}"
}

function map_unmap() {
	[ $# -eq 1 ] || exit 99
	local image_name="$1"

	DEV="$(sudo rbd map "${image_name}")"
	sudo rbd unmap "${DEV}"
}

function setup() {
	[ $# -eq 2 ] || exit 99
	local image_name="$1"
	local image_size="$2"

	rbd create "${image_name}" --size="${image_size}"
}

function cleanup() {
	# Have to rely on globals for the trap call
	# rbd unmap "${DEV}"			|| true
	rbd rm "${IMAGE_NAME}"			|| true
}
trap cleanup EXIT HUP INT

#### Start

setup "${IMAGE_NAME}" "${IMAGE_SIZE}"

COUNT=0
START_TIME=$(get_time)
END_TIME=$(expr $(get_time) + ${RUN_TIME})
while ! times_up "${END_TIME}"; do
	map_unmap "${IMAGE_NAME}"
	COUNT=$(expr $COUNT + 1)
done
ELAPSED=$(expr "$(get_time)" - "${START_TIME}")

echo "${COUNT} iterations completed in ${ELAPSED} seconds"

exit 0
