package edu.kh.project.myPage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.member.model.dto.Member;
import edu.kh.project.myPage.model.service.MypageService;

/*
 * @SessionAttributes 의 역할
 * - Model 에 추가된 속성 중 key 값이 일치하는 속성을 session scope 로 변경
 * - SessionStatus 이용 시 session 에 등록된 완료할 대상을 찾는 용도
 * 
 * @SessionAttributes 의 역할 (매개변수에 쓰는 것)
 * - Session에 존재하는 값을 얻어와야함
 * 
 * */



@Controller
@RequestMapping("myPage")
public class MyPageController {

	@Autowired
	private MypageService service;
	
	@GetMapping("info")
	public String info(@SessionAttribute("loginMember")Member loginMember,Model model) {
		
		//현재 로그인한 회원의 주소를 꺼내옴
		// 현재 로그인한 회원 정보 -> session에 등록된 상태(loginMember)
		
		String memberAddress = loginMember.getMemberAddress();
		//주소가 있다면 "05456^^^블라블라^^^블라블라
		//주소가 없다면 null
		
		//주소가 있을 경우에만 동작
		if(memberAddress != null) {
			
			// 구분자 "^^^" 를 기준으로
			// memberAddress 값을 쪼개어 String[] 로 반환
			String[] arr = memberAddress.split("\\^\\^\\^");
			// -> "04540^^^서울 중구 남대문로 120^^^3층,E강의장"
			//->["04540","서울 중구 남대문로 120,3층 E강의장]
			model.addAttribute("postcode",arr[0]);
			model.addAttribute("address",arr[1]);
			model.addAttribute("detailAddress",arr[2]);
		}
		
		
		return "myPage/myPage-info";
		
	}
	
	//프로필 이미지 변경 화면 이동
	@GetMapping("profile") // myPage/profile Get 요청 매핑
	public String profile() {
		return "myPage/mypage-profile";
	}
	
	//비밀번호 변경 변경 화면 이동
	@GetMapping("changePw") // myPage/profile Get 요청 매핑
	public String changePw() {
			return "myPage/mypage-changePw";
	}
		
	//회원 탈퇴 화면 이동
	@GetMapping("secession") // myPage/profile Get 요청 매핑
	public String secession() {
	return "myPage/mypage-secession";
	}
		
	//파일 업로드 테스트 화면 이동
	@GetMapping("fileTest") // myPage/profile Get 요청 매핑
	public String fileTest() {
	return "myPage/mypage-fileTest";
	}	
	
	/**
	 * @param inputMember   :	커맨드 객체(@ModelAttribute가 생략된 상태) 
	 * 							제출된 수정된 회원 닉네임,전화번호,주소
	 * @param loginmember	:	로그인한 회원 정보(회원 번호 사용할 예정)	
	 * @param memberAddress :	주소만 따로 받은 String[] 구분자 ^^^ 변경 예정 
	 * @param ra			:	리다이렉트 할때 메시지 보내려고
	 * @return
	 */
	@PostMapping("info")
	public String updateInfo(Member inputMember,
							@SessionAttribute("loginMember") Member loginmember,
							@RequestParam("memberAddress")String[] memberAddress,
							RedirectAttributes ra) {
		
		// inputMember에 로그인한 회원 번호 추가
		inputMember.setMemberNo(loginmember.getMemberNo());
		
		
		//회운정보 수정 서비스를 호출한다
		int result = service.updateInfo(inputMember,memberAddress);
		String message = null;
		
		if(result>0) { //회원 정보 수정 성공
			
			//loginMember 새로 세팅
			//우리가 방금 바꾼 값으로 세팅
			
			//loginMember는 세션에 저장된 로그인한 회원 정보가
			// 저장된 객체를 참조하고있다!
			
			//-> loginMember를 수정하면
			//	세션에 저장된 로그인한 회원 정보가 수정된다
			// ==세션 데이터와 DB 데이터를 동기화
			
			loginmember.setMemberNickname(inputMember.getMemberNickname());
			loginmember.setMemberTel(inputMember.getMemberTel());
			loginmember.setMemberAddress(inputMember.getMemberAddress());
			
			message = "회원 정보 수정 성공!!!";
		}else {
			message = "회원 정보 수정 실패...";
		}
		
		ra.addFlashAttribute("message",message);
		
		return "redirect:info";
	}
}
